import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
function navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light mainNav">
      <div class="container-fluid">
        <h3 class="navbar-title rancho-font">CountrySpot</h3>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup "
        >
          <div class="navbar-nav">
            <Link class="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link class="nav-link" to="/profile">
              Profile
            </Link>
            <Link class="nav-link" to="/country">
              Country
            </Link>
            <Link class="nav-link" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
