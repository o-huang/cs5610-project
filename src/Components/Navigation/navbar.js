import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { logout } from "../User/userReducer";
import { useSelector } from "react-redux";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
              <Link className="nav-link" to="/home" onClick={handleLogout}>
                Logout{" "}
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Login{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
