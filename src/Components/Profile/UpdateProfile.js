import React, { useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { updateEmail, updatePassword } from "firebase/auth";

function UpdateProfile() {
  const [username, setUsername] = React.useState("");
  const [newEmail, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
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

  const handleUpdate = async (e) => {
    if (currentUser) {
      try {
        const database = getDatabase();
        const userRef = ref(database, `users/${currentUser.uid}`);

        await update(userRef, {
          username: username,
          email: newEmail,
          phoneNumber: phoneNumber,
        });

        console.log("User data updated successfully!");
        navigate("/profile");
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="mb-4 rancho-font profileHeader">
                {username}
                <Link to="/editprofile"> </Link>
              </h2>

              <Form>
                <Form.Group id="username" className="mt-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                {/* <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group> */}

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <div className="mt-3 text-center">
                  <Button
                    className="mx-2 btn btn-primary"
                    onClick={handleUpdate}
                  >
                    Submit
                  </Button>
                  <Button className="mx-2 btn btn-danger">
                    <Link to="/profile">Cancel</Link>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}

export default UpdateProfile;
