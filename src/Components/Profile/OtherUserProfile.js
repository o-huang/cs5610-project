import React, { useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./profile.css";
import CountryCard from "../Card/CourseCard";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import {
  processUserTopLikedCountries,
  processUserTopCommentedCountries,
} from "./client";
function OtherUserProfile() {
  const [userTopLikedCountries, setUserTopLikedCountries] = React.useState([]);
  const [userTopCommentedCountries, setUserTopCommentedCountries] =
    React.useState([]);
  const [username, setUsername] = React.useState("");

  const { profileId } = useParams();
  // const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser.uid)
  useEffect(() => {
    if (!profileId) {
      return;
    }
    processUserTopLikedCountries(profileId)
      .then((top10Countries) => {
        setUserTopLikedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!profileId) {
      return;
    }

    processUserTopCommentedCountries(profileId)
      .then((top10Countries) => {
        setUserTopCommentedCountries(top10Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const database = getDatabase();
        const userRef = ref(database, `users/${profileId}`);

        const snapshot = await get(child(userRef, "/"));

        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        } else {
          console.error("User data not found in the database");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1300px" }}>
        <>
          <Card className="main-card">
            <Card.Body>
              <h2 className="mb-4 rancho-font profileHeader">
                Profile : {username}
              </h2>

              <Form>
                <div className="row mx-1 mainCardDiv mt-2">
                  <h3 className="rancho-font">
                    <span className="username-style">{username}</span> most
                    Liked Countries
                  </h3>
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
                  <h3 className="rancho-font">
                    <span className="username-style">{username}</span> most
                    Commented Countries
                  </h3>
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
export default OtherUserProfile;
