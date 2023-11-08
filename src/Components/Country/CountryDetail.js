import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./country.css";
function MovieDetail() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
          <div className="row">
            <h1>{country.name}</h1>
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
            <div className="form-group">
              <textarea
                className="form-control newCommentTextArea"
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="btn btn-success w-100 newCommentButton" onClick={addComment}>
                Add Comment
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <h2>Comments</h2>
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li className="list-group-item" key={index}>
                  <div className="d-flex justify-content-between">
                    <h5 className="usernameComment">Owen Huang</h5>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                  <div className="userComment">
                  {comment}
                  </div>
      
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
