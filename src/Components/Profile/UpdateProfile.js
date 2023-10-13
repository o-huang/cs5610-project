import React from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
function UpdateProfile() {
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
                </Link>
              </h2>

              <Form>
                <Form.Group id="username" className="mt-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="username"
                    value={"Owen"}
          
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={"owen@gmail.com"}
             
                  />
                </Form.Group>

                <Form.Group id="phone-number" className="mt-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="phone-number"
                    placeholder="Phone Number"
                    value={"123-456-7890"}
            
                  />
                </Form.Group>
                <div className='mt-3 text-center'>
                <Button className='mx-2 btn btn-primary'>Submit</Button>
                <Button className='mx-2 btn btn-danger'>
                    <Link to="/profile">Cancel</Link>
                </Button>
                </div>
          
              </Form>
            </Card.Body>
          </Card>
        </>
      </div>
    </div>
  )
}

export default UpdateProfile