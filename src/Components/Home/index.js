import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./home.css";
import CountryCard from "../Card/CourseCard";
import * as client from "./client";
import { getTopLikedCountries, getTopCommentedCountries } from "./client";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  const [ratedCountries, setRatedCountries] = useState([]);
  const [commentedCountries, setCommentedCountries] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([getTopLikedCountries(), getTopCommentedCountries()])
      .then(([ratedCountries, commentedCountries]) => {
        setRatedCountries(ratedCountries);
        setCommentedCountries(commentedCountries);
      })
      .catch((error) => {
        // Handle any errors that may occur during the promise resolution
        console.error("Error:", error);
      });
  }, []);

  const getRandomImageUrl = () => {
    const imageUrls = ["https://via.placeholder.com/80"];
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
  };
  return (
    <div className=" d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div className="row imageHeader">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h1 className="rancho-font homePageCenterText">CountrySpot</h1>
            <p className="homePageCenterTextSub">
              Like, Comment, and Learn about your Country
            </p>
          </div>
        </div>
        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Top 10 Rated Countries</h3>
          <div className="d-flex flex-wrap overflow-div ratedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard keyIndex ={index} country={country} alpha3Code ={country.alpha3Code}/>
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Top 10 Commented Countries</h3>
          <div className="d-flex flex-wrap overflow-div commentedCountries">
            {commentedCountries.map((country, index) => (
              <CountryCard keyIndex ={index} country={country} alpha3Code ={country.alpha3Code} />
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Your Top 10 Rated Countries</h3>
          <div className="d-flex flex-wrap overflow-div UserRatedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard keyIndex ={index} country={country} alpha3Code ={country.alpha3Code}/>
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Your Top 10 Commented Countries</h3>
          <div className="d-flex flex-wrap overflow-div UserCommentedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard keyIndex ={index} country={country} alpha3Code ={country.alpha3Code} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
