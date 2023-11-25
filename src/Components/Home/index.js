import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./home.css";
import CountryCard from "../Card/CourseCard";
import * as client from "./client";
import { getTopLikedCountries, getTopCommentedCountries } from "./client";
import { useSelector, useDispatch } from "react-redux";
import "firebase/auth";
import firebase from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import axios from "axios";
import {
  processTopLikedCountries,
  processTopCommentedCountries,
} from "./client";
import {
  processUserTopLikedCountries,
  processUserTopCommentedCountries,
} from "../Profile/client";
import { current } from "@reduxjs/toolkit";
function Home() {
  const [ratedCountries, setRatedCountries] = useState([]);
  const [commentedCountries, setCommentedCountries] = useState([]);
  const [userTopLikedCountries, setUserTopLikedCountries] = useState([]);
  const [userTopCommentedCountries, setUserTopCommentedCountries] = useState(
    []
  );
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    processTopLikedCountries()
      .then((top10Countries) => {
        setRatedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    processTopCommentedCountries()
      .then((top10Countries) => {
        setCommentedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    processUserTopLikedCountries(currentUser.uid)
      .then((top10Countries) => {
        setUserTopLikedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    processUserTopCommentedCountries(currentUser.uid)
      .then((top10Countries) => {
        setUserTopCommentedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentUser]);

  return (
    <div className=" d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div className="row imageHeader">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h1 className="rancho-font homePageCenterText">CountrySpot</h1>
            <p className="homePageCenterTextSub">
              Like, Comment, and Learn about your Country
            </p>
            <p className="homePageCenterTextSub">
              {currentUser ? currentUser.email : "Sign Up Now!"}
            </p>
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Overall Top 10 Rated Countries</h3>
          <div className="d-flex flex-wrap overflow-div ratedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard
                keyIndex={index}
                country={country}
                alpha3Code={country.alpha3Code}
              />
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Overall Top 10 Commented Countries</h3>
          <div className="d-flex flex-wrap overflow-div commentedCountries">
            {commentedCountries.map((country, index) => (
              <CountryCard
                keyIndex={index}
                country={country}
                alpha3Code={country.alpha3Code}
              />
            ))}
          </div>
        </div>
        {currentUser ? (
          <div className="row mx-1 mainCardDiv mt-5">
            <h3 className="rancho-font">Your Liked Countries</h3>
            <div className="d-flex flex-wrap overflow-div UserRatedCountries">
              {userTopLikedCountries.map((country, index) => (
                <CountryCard
                  keyIndex={index}
                  country={country}
                  alpha3Code={country.alpha3Code}
                />
              ))}
            </div>{" "}
          </div>
        ) : (
          <div></div>
        )}

        {currentUser ? (
          <div className="row mx-1 mainCardDiv mt-5">
            <h3 className="rancho-font">Your Commented Countries</h3>
            <div className="d-flex flex-wrap overflow-div UserCommentedCountries">
              {userTopCommentedCountries.map((country, index) => (
                <CountryCard
                  keyIndex={index}
                  country={country}
                  alpha3Code={country.alpha3Code}
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Home;
