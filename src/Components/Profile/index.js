import React from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./profile.css";
import CountryCard from "../Card/CourseCard";
function Profile() {
  const ratedCountries = [
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
    },
    {
      name: "Country 2",
      rating: 5,
      description: "A must-visit destination for travelers.",
      flags: "https://via.placeholder.com/80",
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
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1300px" }}>
        <>
          <Card className="main-card">
            <Card.Body>
              <h2 className="mb-4">
                Owen Huang
                <Link to="/editprofile">
                  {" "}
                  <AiFillEdit className="float-end" />
                </Link>
              </h2>

              <Form>
                <Form.Group id="username" className="mt-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="username"
                    value={"Owen"}
                    disabled
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={"owen@gmail.com"}
                    disabled
                  />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Phone Number"
                    value={"123-456-7890"}
                    disabled
                  />
                </Form.Group>

                <div className="row mx-1 mainCardDiv mt-2">
                  <h3 className="rancho-font">My Rated Countries</h3>
                  <div className="d-flex flex-wrap overflow-div ">
                    {ratedCountries.map((country, index) => (
                      <CountryCard keyIndex={index} country={country} alpha3Code ={country.alpha3Code}/>
                    ))}
                  </div>
                </div>

                <div className="row mx-1 mainCardDiv mt-2">
                  <h3 className="rancho-font">My Commented Countries</h3>
                  <div className="d-flex flex-wrap overflow-div ">
                    {ratedCountries.map((country, index) => (
                      <CountryCard keyIndex={index} country={country} alpha3Code ={country.alpha3Code}/>
                    ))}
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}

export default Profile;
