import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Action } from "history";
import { Context } from "../store/appContext";

export function FormUser() {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = [
        "firstname",
        "lastname",
        "age",
        "email",
        "username",
        "city",
        "address",
        "phone",
        "password",
        "profilePic",
      ];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      console.log(data);
      let resp = actions.NewUser(data);
      if (resp) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="firstname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              name="firstname"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Lastname"
              name="lastname"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom03">
            <Form.Label>Age</Form.Label>
            <Form.Control required type="number" placeholder="Age" name="age" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              name="email"
            />
            <Form.Control.Feedback type="invalid">
              Porfavor Agregar un correo
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              name="username"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required name="city" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              name="address"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom08">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="num"
              placeholder="Phone"
              required
              name="phone"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="formFile" className="mb-3">
            <Button
              type="button"
              className="btn btn-success"
              style={{ marginTop: "30px" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Upload profile picture
            </Button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      You can upload, later
                    </h5>
                  </div>
                  <div className="modal-body">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>Choose your profile picture</Form.Label>
                      <Form.Control type="file" name="profilePic" />
                    </Form.Group>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      aria-label="Close"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save and send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label
            htmlFor="password"
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            id="password"
            aria-describedby="passwordHelpBlock"
            name="password"
          />
          <Form.Label
            htmlFor="password2"
            onChange={(e) => setPassword2(e.target.value)}
          >
            Repeat Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            id="password2"
            aria-describedby="passwordHelpBlock"
          />
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <div>
          <Button type="submit">Send submit</Button>
        </div>
      </Form>
    </div>
  );
}
