import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./country.css";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import "firebase/auth";
import firebase from "../../firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
  onValue,
  off,
} from "firebase/database";

function MovieDetail() {
  const { countryName, alpha3Code } = useParams();

  const [country, setCountry] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [usUserModerator, setUsUserModerator] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const database = getDatabase();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLike = async () => {
    try {
      const likeId = `like_${user.uid}_${alpha3Code}`;
      const likesRef = ref(database, "likes");
      const likeSnapshot = await get(child(likesRef, likeId));

      if (likeSnapshot.exists()) {
        await remove(child(likesRef, likeId));
        setIsLiked(false);
      } else {
        await set(child(likesRef, likeId), {
          user: user.uid,
          alpha3Code: alpha3Code,
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleAddNewComment = async () => {
    try {
      if (editingCommentId) {
        const editedCommentRef = ref(database, `comments/${editingCommentId}`);
        await set(editedCommentRef, {
          ...comments.find((comment) => comment.commentId === editingCommentId),
          comment: newComment,
        });
        setEditingCommentId(null);
      } else {
        const commentId = `comment_${
          user.uid
        }_${alpha3Code}_${new Date().getTime()}`;
        const commentsRef = ref(database, "comments");
        await set(child(commentsRef, commentId), {
          user: user.uid,
          alpha3Code: alpha3Code,
          comment: newComment,
          commentId: commentId,
        });
      }

      // Clear the textarea
      setNewComment("");
    } catch (error) {
      console.error("Error adding/editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentsRef = ref(database, "comments");
      const commentSnapshot = await get(child(commentsRef, commentId));

      if (commentSnapshot.exists()) {
        const comment = commentSnapshot.val();

        await remove(child(commentsRef, commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDisableComments = async () => {
    try {
      const commentId = `comment_country_${alpha3Code}`;
      const commentRef = ref(database, "commentTextAreaStatus");
      const commentSnapshot = await get(child(commentRef, commentId));

      if (commentSnapshot.exists()) {
        await remove(child(commentRef, commentId));
        setIsCommentDisabled(false);
      } else {
        await set(child(commentRef, commentId), {
          alpha3Code: alpha3Code,
        });
        setIsCommentDisabled(true);
      }
    } catch (error) {
      console.error("Error handling disabling comment:", error);
    }
  };

  useEffect(() => {
    const apiUrl = "https://restcountries.com/v2/all";

    axios
      .get(apiUrl)
      .then((response) => {
        const matchingCountry = response.data.find(
          (c) => c.name === countryName
        );

        if (matchingCountry) {
          setCountry(matchingCountry);
        } else {
          console.error("Country not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }, [countryName]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // const userId = "user123"; // Replace with your user ID or fetch it dynamically
        const likeId = `like_${user.uid}_${alpha3Code}`;

        const likesSnapshot = await get(child(ref(database, "likes"), likeId));

        if (likesSnapshot.exists()) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  useEffect(() => {
    const fetchCommentDisabled = async () => {
      try {
        const commentId = `comment_country_${alpha3Code}`;

        const commentSnapshot = await get(
          child(ref(database, "commentTextAreaStatus"), commentId)
        );

        if (commentSnapshot.exists()) {
          setIsCommentDisabled(true);
        }
      } catch (error) {
        console.error("Error fetching commentDisabled:", error);
      }
    };
    fetchCommentDisabled();
  }, []);

  useEffect(() => {
    const checkUserIsAdminOrModerator = async () => {
      try {
        const userSnapshot = await get(child(ref(database, "users"), user.uid));

        if (userSnapshot.val().adminUser === true) {
          setIsUserAdmin(true);
        }

        if (userSnapshot.val().moderatorUser === true) {
          setUsUserModerator(true);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    checkUserIsAdminOrModerator();
  }, []);

  useEffect(() => {
    const commentsRef = ref(database, "comments");

    const handleData = async (snapshot) => {
      if (snapshot.exists()) {
        const commentsObject = snapshot.val();
        const commentsArray = Object.values(commentsObject).filter(
          (comment) => comment.alpha3Code === alpha3Code
        );

        const commentsWithUsernames = await Promise.all(
          commentsArray.map(async (comment) => {
            try {
              const userSnapshot = await get(
                child(ref(database, "users"), comment.user)
              );

              if (userSnapshot.exists()) {
                const user = userSnapshot.val();
                return {
                  ...comment,
                  username: user.username,
                };
              }
            } catch (error) {
              console.error("Error fetching user information:", error);
            }

            return comment;
          })
        );

        setComments(commentsWithUsernames.reverse());
      } else {
        console.log("No comments found for this country");
        setComments([]);
      }
    };

    const commentsListener = onValue(commentsRef, handleData);

    const cleanupListener = () => {
      off(commentsRef, "value", handleData);
    };

    return cleanupListener;
  }, [alpha3Code]);

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
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital : "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population ? country.population : "N/A"}
              </p>
              <p>
                <strong>Region:</strong>{" "}
                {country.region ? country.region : "N/A"}
              </p>
              <p>
                <strong>Subregion:</strong>{" "}
                {country.subregion ? country.subregion : "N/A"}
              </p>
              <p>
                <strong>Area:</strong> {country.area ? country.area : "N/A"}
              </p>
              <div>
                {isUserAdmin && (
                  <button
                    className={`btn ${
                      isCommentDisabled ? "btn-success" : "btn-secondary"
                    }`}
                    onClick={handleDisableComments}
                  >
                    Disable Comments
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <h4 className="rancho-font">Additional Details</h4>
              <p>
                <strong>Time Zone:</strong>{" "}
                {country.timezones && country.timezones.length > 0
                  ? country.timezones[0]
                  : "N/A"}
              </p>
              <p>
                <strong>Language:</strong>{" "}
                {country.languages && country.languages.length > 0
                  ? country.languages[0].name || "N/A"
                  : "N/A"}
              </p>
              <p>
                <strong>Currency:</strong>{" "}
                {country.currencies && country.currencies.length > 0
                  ? country.currencies[0].name || "N/A"
                  : "N/A"}
              </p>
              <p>
                <strong>Calling Code:</strong>{" "}
                {country.callingCodes && country.callingCodes.length > 0
                  ? country.callingCodes[0] || "N/A"
                  : "N/A"}
              </p>
              <p>
                <strong>Native Name:</strong>{" "}
                {country.nativeName ? country.nativeName : "N/A"}
              </p>

              <div className="mt-3">
                <button
                  className={`btn ${isLiked ? "btn-success" : "btn-secondary"}`}
                  onClick={handleLike}
                >
                  <BsFillHandThumbsUpFill /> {isLiked ? "Liked" : "Like"}
                </button>
                <span
                  className={`badge badge-${isLiked ? "success" : "light"}`}
                ></span>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="form-group">
              <textarea
                className="form-control newCommentTextArea"
                placeholder={
                  isCommentDisabled
                    ? "Comments are disabled"
                    : "Enter your comment..."
                }
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isCommentDisabled}
              />
              <button
                className="btn btn-success w-100 newCommentButton"
                onClick={handleAddNewComment}
                disabled={isCommentDisabled}
              >
                {editingCommentId ? "Update Comment" : "Add Comment"}
              </button>
            </div>
          </div>
          <div className="row my-3">
            <h2>Comments</h2>
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li className="list-group-item" key={index}>
                  <div className="d-flex justify-content-between">
                    <Link className="nav-link" to={`/profile/${comment.user}`}>
                      <h5 className="usernameComment">{comment.username}</h5>
                    </Link>
                    {comment.user === currentUser.uid ? (
                      <div>
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            setNewComment(comment.comment);
                            setEditingCommentId(comment.commentId);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteComment(comment.commentId)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="userComment">{comment.comment}</div>
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
