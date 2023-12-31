import React, { useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./profile.css";
import CountryCard from "../Card/CourseCard";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import {
  processUserTopLikedCountries,
  processUserTopCommentedCountries,
} from "./client";
function Profile() {
  const [userTopLikedCountries, setUserTopLikedCountries] = React.useState([]);
  const [userTopCommentedCountries, setUserTopCommentedCountries] =
    React.useState([]);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const currentUser = useSelector((state) => state.user.currentUser);
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

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const database = getDatabase();
          const userRef = ref(database, `users/${currentUser.uid}`);

          const snapshot = await get(child(userRef, "/"));

          if (snapshot.exists()) {
            // Set the user data in local state
            setUsername(snapshot.val().username);
            setEmail(snapshot.val().email);
            setPhoneNumber(snapshot.val().phoneNumber);
          } else {
            console.error("User data not found in the database");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1300px" }}>
        <>
          <Card className="main-card">
            <Card.Body>
              <h2 className="mb-4 rancho-font profileHeader">
                {username}
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
                    value={username}
                    disabled
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    disabled
                  />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    disabled
                  />
                </Form.Group>

                <div className="row mx-1 mainCardDiv mt-2">
                  <h3 className="rancho-font">My Liked Countries</h3>
                  <div className="d-flex flex-wrap overflow-div ">
                    {userTopLikedCountries.map((country, index) => (
                      <CountryCard
                        keyIndex={index}
                        country={country}
                        alpha3Code={country.alpha3Code}
                      />
                    ))}
                  </div>
                </div>

                <div className="row mx-1 mainCardDiv mt-2">
                  <h3 className="rancho-font">My Commented Countries</h3>
                  <div className="d-flex flex-wrap overflow-div ">
                    {userTopCommentedCountries.map((country, index) => (
                      <CountryCard
                        keyIndex={index}
                        country={country}
                        alpha3Code={country.alpha3Code}
                      />
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
