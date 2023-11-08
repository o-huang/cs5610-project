import React from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./home.css";
import CountryCard from "../Card/CourseCard";
function Home() {
  const ratedCountries = [
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags:"https://via.placeholder.com/80"
    },

    // Add more countries as needed
  ];

  const getRandomImageUrl = () => {
    const imageUrls = [
      "https://via.placeholder.com/80",

      // Add more image URLs as needed
    ];
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
  };
  return (
    <div className=" d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Top 10 Rated Countries</h3>
          <div className="d-flex flex-wrap overflow-div ratedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Top 10 Commented Countries</h3>
          <div className="d-flex flex-wrap overflow-div commentedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Your Top 10 Rated Countries</h3>
          <div className="d-flex flex-wrap overflow-div UserRatedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </div>

        <div className="row mx-1 mainCardDiv mt-5">
          <h3 className="rancho-font">Your Top 10 Commented Countries</h3>
          <div className="d-flex flex-wrap overflow-div UserCommentedCountries">
            {ratedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
