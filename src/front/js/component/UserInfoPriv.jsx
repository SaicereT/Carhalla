import React, { useContext, useEffect, useState } from "react";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const UserInfo = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = ["email", "username", "city", "address", "phone", "bio"];
      campos.forEach((campo) => {
        if (campo != "" || undefined) {
          data[campo] = formData.get(campo);
        }
      });
      console.log(data)
      let resp = actions.updateProfileInfo(data);
      if (resp) {
        navigate(0);
      } else {
        return;
      }
    }
  };

  return (
    <div className="card mb-3">
      {props.id ? (
        <div className="row g-0">
          <div className="col-md-8 card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">Profile Info</h5>
              <p className="card-text">Address: {props.address}</p>
              <p className="card-text">Age: {props.age}</p>
              <p className="card-text">Country: {props.country}</p>
              <p className="card-text">Email: {props.email}</p>
              <p className="card-text">Username: {props.username}</p>
              <p className="card-text">First Name: {props.firstname}</p>
              <p className="card-text">Last Name: {props.lastname}</p>
              <p className="card-text">Telephone Number: {props.telnumber}</p>
              <p className="card-text">Bio: {props.bio}</p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit <i className="bi bi-pencil-square"></i>
              </button>
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
                        Edit Profile Info
                        <p className="fw-lighter">
                          (Only the fields that are filled will be updated)
                        </p>
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <Form onSubmit={(event) => handleSubmit(event)}>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder={props.email}
                              name="email"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please add an email
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom05"
                          >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={props.username}
                              name="username"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a username
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom06"
                          >
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={props.country}
                              name="city"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid Country.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom07"
                          >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={props.address}
                              name="address"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide an address.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="5"
                            controlId="validationCustom08"
                          >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="num"
                              placeholder={props.telnumber}
                              name="phone"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid phone number.
                            </Form.Control.Feedback>               
                        </Form.Group>
                        <Form.Group as={Col} md="12" className="mb-1">
                              <Form.Label>Bio</Form.Label>
                              <Form.Control
                                as="textarea"
                                type="text"
                                placeholder={props.bio}
                                name="bio"
                              />
                            </Form.Group>
                        </Row>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <Button type="submit" className="btn btn-primary">
                            Submit changes
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h5>Loading Info...</h5>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
