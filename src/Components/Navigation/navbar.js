import React, { useEffect, useState } from "react";

import "./styles.css";
import { signOut } from "firebase/auth";

import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { logout } from "../User/userReducer";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
  onValue,
  off,
} from "firebase/database";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usUserModerator, setUsUserModerator] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const database = getDatabase();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const checkUserIsAdminOrModerator = async () => {
      try {
        const userSnapshot = await get(child(ref(database, "users"), user.uid));

        // if (userSnapshot.val().adminUser === true) {
        //   setIsUserAdmin(true);
        // }

        if (userSnapshot.val().moderatorUser === true) {
          setUsUserModerator(true);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    checkUserIsAdminOrModerator();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mainNav">
      <div className="container-fluid">
        <h3 className="navbar-title rancho-font">CountrySpot</h3>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup "
        >
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to={currentUser ? "/profile" : "/login"}>
              Profile
            </Link>

            <Link className="nav-link" to={currentUser ? "/search" : "/login"}>
              Country
            </Link>

            {currentUser ? (
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout{" "}
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Login{" "}
              </Link>
            )}
            {usUserModerator && (
              <Link className="nav-link" to="/moderate">
                Moderator
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
