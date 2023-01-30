import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Context } from "../store/appContext";
import { FormCheck } from "react-bootstrap";

export const AddPost = () => {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      console.log(formData);
      let files = event.target.elements["postPic"].files;
      if (files.length == 0) formData.delete("postPic");
      let resp = actions.NewPost(formData);
      if (resp) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="mb-3 mt-5">
          <Form.Group as={Col} md="3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Model"
              required
              name="model"
            />
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" placeholder="Make" required name="make" />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              name="title"
            />
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Style</Form.Label>
            <Form.Control
              type="text"
              placeholder="Style"
              required
              name="style"
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Fuel</Form.Label>
            <Form.Select name="fuel">
              <option value="gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="hybrid">hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Transmission</Form.Label>
            <Form.Select name="transmission">
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="1">
            <Form.Label>Financing</Form.Label>
            <Form.Check name="financing" />
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Doors</Form.Label>
            <Form.Select name="doors">
              <option value="3">3</option>
              <option value="4">4 or more</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              required
              name="year"
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="$0.000"
              required
              name="price"
            />
          </Form.Group>
          <Form.Group as={Col} md="11">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              name="description"
            />
          </Form.Group>
        </Row>

        <Button
          type="button"
          className="btn btn-primary"
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
                  Add photos now?
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
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Choose multiple car photos</Form.Label>
                    <Form.Control type="file" multiple name="postPic" />
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
                    Close
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary "
                  data-bs-dismiss="modal"
                >
                  skip
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  upload pictures
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
