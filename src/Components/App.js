import React from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import Movie from "./Movie";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Navbar from "./Navigation/navbar";
import EditProfile from "./Profile/UpdateProfile";
import "./styles.css";
function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
        <div className="row contentRow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/editprofile" element={<EditProfile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
