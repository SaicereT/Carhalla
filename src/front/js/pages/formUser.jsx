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
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  var apiurl =
    "https://3001-saiceret-proyectofinalj-jhc95hjz0rz.ws-us82.gitpod.io/api/signup";
  async function NewUser() {
    respuesta = await fetch(apiurl, {
      method: "POST",
      body: JSON.stringify({
        email: [email],
        password: [password],
        firstname: [firstname],
        lastname: [lastname],
        is_active: [true],
        telnumber: [phone],
        address: [adress],
        country: [city],
        age: [age],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              htmlFor="username"
              required
              type="text"
              placeholder="Nombre"
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

          <Form.Group as={Col} md="6" controlId="validationCustom04">
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
              placeholder="Adress"
              required
              name="adress"
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Acepto uso de terminos y condiciones"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label htmlFor="inputPassword5">Constraseña</Form.Label>
          <Form.Control
            required
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Label htmlFor="inputPasswordRE">Repetir Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            id="inputPasswordRE"
            aria-describedby="passwordHelpBlock"
          />
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted>
          Su contraseña debe tener entre 8 y 20 caracteres, contener letras y
          números, y no debe contener espacios, caracteres especiales o emoji.
        </Form.Text>

        <div>
          <Button type="submit" onClick={() => NewUser}>
            Enviar Formulario
          </Button>
        </div>
      </Form>
    </div>
  );
}
