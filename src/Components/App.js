import React, { useEffect } from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import Profile from "./Profile";
import Country from "./Country";
import CountryDetail from "./Country/CountryDetail";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Navbar from "./Navigation/navbar";
import EditProfile from "./Profile/UpdateProfile";
import OtherUserProfile from "./Profile/OtherUserProfile";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import { setCurrentUser } from "./User/userReducer";
import { useSelector } from "react-redux";
function App() {
  // const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      store.dispatch(setCurrentUser(user));
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row">
            <Navbar />
          </div>
          <div className="row contentRow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/profile/:profileId"
                element={<OtherUserProfile />}
              />
              <Route path="/search" element={<Country />} />
              <Route
                path="/detail/:countryName/:alpha3Code"
                element={<CountryDetail />}
              />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
