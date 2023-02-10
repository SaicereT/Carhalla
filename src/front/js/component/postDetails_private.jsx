import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCardPrivate from "./PostCard_private.jsx";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const PostDetailsPrivate = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { postid } = useParams();

  useEffect(() => {
    if (store.accessToken) actions.getUserFavorites();
  }, [store.accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = [
        "title",
        "model",
        "make",
        "style",
        "fuel",
        "transmission",
        "financing",
        "doors",
        "year",
        "miles",
        "price",
        "description",
      ];
      campos.forEach((campo) => {
        if (campo != "" || undefined || null) {
          data[campo] = formData.get(campo);
        }
        if (campo == "financing") {
          if (formData.get("financing") == "yes") {
            data[campo] = true;
          } else if (formData.get("financing") == "no") {
            data[campo] = false;
          }
        }
      });
      let resp = actions.updatePostInfo(data, props.id);
      //if (resp) {
      //  navigate(0);
      ///=} else {
      //  return;
      //}
    }
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">Inserte imagen aqui</div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">Make: {props.make}</p>
            <p className="card-text">Model: {props.model}</p>
            <p className="card-text">Miles: {props.miles}</p>
            <p className="card-text">Price: {props.price}</p>
            <p className="card-text">Year: {props.year}</p>
            <p className="card-text">Style: {props.style}</p>
            <p className="card-text">Fuel: {props.fuel}</p>
            <p className="card-text">Transmission Type: {props.transmission}</p>
            {props.financing == true ? (
              <p className="card-text">Financing: Yes</p>
            ) : (
              <p className="card-text">Financing: No</p>
            )}
            <p className="card-text">Doors: {props.doors}</p>
            <p className="card-text">Description: {props.description}</p>
            <div className="card-body d-flex justify-content-between">
              <Link to={-1}>
                <button
                  className="btn btn-danger"
                  onClick={() => actions.DeletePost(postid)}
                >
                  Delete
                </button>
              </Link>
              <Link to="/profile_pagePriv">
                <button className="btn btn-secondary" type="button">
                  Go back!
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => actions.handleFavorites(props.id)}
              >
                <i className="bi bi-heart-fill"></i>
              </button>
              <button
                type="button"
                className="btn btn-primary"
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
                        Edit Post Info
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
                          <Form.Group as={Col} md="12" className="mb-1">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control
                              type="textarea"
                              placeholder="Title"
                              name="title"
                              id="title"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Model"
                              name="model"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Make"
                              name="make"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Style</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Style"
                              name="style"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="5" className="mb-1">
                            <Form.Label>Fuel</Form.Label>
                            <Form.Select name="fuel">
                              <option value="">No Update</option>
                              <option value="gasoline">Gasoline</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Electric">Electric</option>
                              <option value="hybrid">hybrid</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group as={Col} md="5" className="mb-1">
                            <Form.Label>Transmission</Form.Label>
                            <Form.Select name="transmission">
                              <option value="">No Update</option>
                              <option value="Manual">Manual</option>
                              <option value="Automatic">Automatic</option>
                              <option value="CVT">CVT</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} md="5" className="mb-1">
                            <Form.Label>Financing</Form.Label>
                            <Form.Select name="financing">
                              <option value="">No Update</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} md="3" className="mb-1">
                            <Form.Label>Doors</Form.Label>
                            <Form.Select name="doors">
                              <option value="">No Update</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4 or more</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} md="3" className="mb-1">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Year"
                              name="year"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="3" className="mb-1">
                            <Form.Label>Miles</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Miles"
                              name="miles"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="3" className="mb-1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="$0.000"
                              name="price"
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="12" className="mb-1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              type="text"
                              placeholder="Description"
                              name="description"
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
      </div>
    </div>
  );
};
