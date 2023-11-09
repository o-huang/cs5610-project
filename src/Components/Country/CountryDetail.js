import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./country.css";
import {BsFillHandThumbsUpFill} from "react-icons/bs";
function MovieDetail() {
  const { countryName, countryId } = useParams();
  console.log(countryName, countryId);
  const [country, setCountry] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    // Define the API endpoint URL to fetch all countries
    const apiUrl = "https://restcountries.com/v2/all";

    // Make an HTTP GET request to the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Find the country with the matching name in the response data
        const matchingCountry = response.data.find(
          (c) => c.name === countryName
        );

        if (matchingCountry) {
          setCountry(matchingCountry);
        } else {
          // Handle the case where the country is not found
          console.error("Country not found");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching country data:", error);
      });
  }, [countryName]);

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([newComment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div>
      {country ? (
        <div className="container">
          <div className="row mt-3">
            <h1 className="rancho-font">{country.name}</h1>
          </div>
          <div className="row">
            <img
              src={country.flags.png}
              alt={country.name}
              width="200"
              height="400"
            />
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <h4 className="rancho-font">Basic Information</h4>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Subregion:</strong> {country.subregion}
              </p>
              <p>
                <strong>Area:</strong> {country.area}
              </p>
            </div>

            <div className="col-md-6">
              <h4 className="rancho-font">Additional Details</h4>
              <p>
                <strong>Time Zone:</strong> {country.timezones}
              </p>
              <p>
                <strong>Language:</strong> {country.languages[0].name}
              </p>
              <p>
                <strong>Currency:</strong> {country.currencies[0].name}
              </p>
              <p>
                <strong>Calling Code:</strong> {country.callingCodes[0]}
              </p>
              <p>
                <strong>Native Name:</strong> {country.nativeName}
              </p>
              <div className="mt-3">
            <button
              className={`btn ${isLiked ? 'btn-success' : 'btn-secondary'}`}
              onClick={handleLike}
            >
              <BsFillHandThumbsUpFill /> {isLiked ? 'Liked' : 'Like'}
            </button>
            <span className={`badge badge-${isLiked ? 'success' : 'light'}`}>{likes}</span>
          </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="form-group">
              <textarea
                className="form-control newCommentTextArea"
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="btn btn-success w-100 newCommentButton"
                onClick={addComment}
              >
                Add Comment
              </button>
            </div>
          </div>
          <div className="row my-3">
            <h2>Comments</h2>
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li className="list-group-item" key={index}>
                  <div className="d-flex justify-content-between">
                    <h5 className="usernameComment">Owen Huang</h5>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                  <div className="userComment">{comment}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
