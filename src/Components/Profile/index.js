import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
function Profile() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="mb-4">
                Owen Huang
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
                    value={"Owen"}
                    disabled
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={"owen@gmail.com"}
                    disabled
                  />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Phone Number"
                    value={"123-456-7890"}
                    disabled
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  );
}

export default Profile;
