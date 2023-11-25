import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { auth } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../User/userReducer";
function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [regularUser, setRegularUser] = React.useState(false);
  const [adminUser, setAdminUser] = React.useState(false);
  const [moderatorUser, setModeratorUser] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      set(userRef, {
        username,
        email,
        phoneNumber,
        regularUser,
        adminUser,
        moderatorUser,
      });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.accessToken);
      dispatch(setCurrentUser(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="mb-4 rancho-font">Sign Up Now!</h2>

              <Form>
                <Form.Group id="username" className="mt-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Choose User Role/Roles: Admin can delete any comments. Moderator can delete any comments/disable posts.</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Regular User"
                    checked={regularUser}
                    onChange={(e) => setRegularUser(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    checked={adminUser}
                    onChange={(e) => setAdminUser(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Moderator"
                    checked={moderatorUser}
                    onChange={(e) => setModeratorUser(e.target.checked)}
                  />
                </Form.Group>
              </Form>
              <div className="d-flex  justify-content-center mt-3">
                <button className="btn btn-primary mx-3" onClick={handleSubmit}>
                  Sign Up!
                </button>
                <Link className="nav-link" to="/login">
                  <button className="btn btn-primary mx-3">Login</button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}

export default SignUp;
