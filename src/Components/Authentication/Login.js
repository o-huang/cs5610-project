import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../User/userReducer";
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
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
              <h2 className="mb-4 rancho-font">Log In Now!</h2>

              <Form>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group id="password" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <div className="d-flex  justify-content-center mt-3">
                <button className="btn btn-primary mx-3" onClick={handleSubmit}>
                  Login
                </button>
                <Link className="nav-link" to="/signUp">
                  <button className="btn btn-primary mx-3">Register</button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}

export default Login;
