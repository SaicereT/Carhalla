import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Action } from "history";

export function FormUser() {
  const [validated, setValidated] = useState(false);

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
        "city",
        "address",
        "phone",
        "password",
      ];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      console.log(data);
      NewUser(data);
      //setValidated(true);
    }
  };

  async function NewUser(data) {
    var apiurl =
      "https://3001-saiceret-proyectofinalj-6y3huu2bh8a.ws-us82.gitpod.io/api/signup";
    let respuesta = await fetch(apiurl, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        is_active: true,
        telnumber: data.phone,
        address: data.address,
        country: data.city,
        age: data.age,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="container">
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
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Lastname"
              name="lastname"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
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
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required name="city" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom06">
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
          <Form.Group as={Col} md="3" controlId="validationCustom07">
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
            <Form.Label>File</Form.Label>
            <Form.Control type="file" />
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
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            required
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            name="password"
          />
          <Form.Label htmlFor="inputPasswordRE">Repeat Password</Form.Label>
          <Form.Control
            required
            type="password"
            id="inputPasswordRE"
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
