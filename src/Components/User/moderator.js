import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  get,
  remove,
  onValue,
  off,
} from "firebase/database";
function Moderator() {
  const [comments, setComments] = useState([]);

  const database = getDatabase();

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

  useEffect(() => {
    const commentsRef = ref(database, "comments");

    const handleData = async (snapshot) => {
      if (snapshot.exists()) {
        const commentsObject = snapshot.val();
        const commentsArray = Object.values(commentsObject);

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
        console.log("No comments found in the database");
        setComments([]);
      }
    };

    const commentsListener = onValue(commentsRef, handleData);

    const cleanupListener = () => {
      off(commentsRef, "value", handleData);
    };

    return cleanupListener;
  }, []);

  useEffect(() => {
    console.log("Comments:", comments); 
  }, [comments]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1300px" }}>
        <>
          <Card className="main-card">
            <Card.Body>
              <h2 className="mb-4 rancho-font profileHeader">
                Moderate All Comments
              </h2>

              <ul className="list-group">
                {comments.map((comment, index) => (
                  <li className="list-group-item" key={index}>
                    <div className="d-flex justify-content-between">
                      <Link
                        className="nav-link"
                        to={`/profile/${comment.user}`}
                      >
                        <h5 className="usernameComment">{comment.username}</h5>
                      </Link>

                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteComment(comment.commentId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="userComment">{comment.comment}</div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}
export default Moderator;
