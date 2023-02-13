import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Context } from "../store/appContext";

export function FormUser() {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data, event) {
    console.log(JSON.stringify(data, null, 4));
    return false;
  }

  const submitForm = (data, event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      //console.log(Array.from(formData.entries()));
      let file = event.target.elements["profilePic"].files;
      //console.log(Array.from(formData.entries()));
      let resp = actions.NewUser(formData);
      if (resp) {
        navigate("/");
      }
    }
  };
  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <Form onSubmit={handleSubmit(submitForm)}>
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
          <Form.Group as={Col} md="5" controlId="validationCustom06">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              required
              name="country"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid country.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom07">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              name="address"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid country.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom08">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="num"
              placeholder="Phone"
              required
              name="telnumber"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="5"
            controlId="formFile"
            className="mb-3"
          ></Form.Group>
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
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            required
            type="password"
            id="password"
            aria-describedby="passwordHelpBlock"
            name="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>

          <Form.Label htmlFor="password2">Repeat Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="confirmpwd"
            id="confirmPwd"
            aria-describedby="passwordHelpBlock"
            {...register("confirmPwd")}
            className={`form-control ${errors.confirmPwd ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <div>
          <Button
            type="button"
            className="btn btn-primary mt-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Next step
          </Button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Profile Picture
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex grid gap-3">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose profile picture (optional)</Form.Label>
                      <Form.Control type="file" multiple name="profilePic" />
                    </Form.Group>
                  </div>
                </div>
                <div className="modal-footer d-flex">
                  <div className="p-2 flex-grow-1">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      aria-label="Close"
                      data-bs-dismiss="modal"
                    >
                      Back to form
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="btn btn-primary "
                    data-bs-dismiss="modal"
                  >
                    Skip picture
                  </Button>

                  <Button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Upload picture
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
const rootElement = document.getElementById("root");
