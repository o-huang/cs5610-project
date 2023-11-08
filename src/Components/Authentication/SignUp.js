import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
function SignUp() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="mb-4 rancho-font" >Sign Up Now!</h2>

              <Form>
                <Form.Group id="username" className="mt-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="Email" placeholder="Enter Email" />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Enter Phone Number"
                  />
                </Form.Group>
              </Form>
              <div className="d-flex  justify-content-center mt-3">
                <button className="btn btn-primary mx-3">Sign Up!</button>
                <Link class="nav-link" to="/login">
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
