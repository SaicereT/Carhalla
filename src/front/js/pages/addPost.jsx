import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Context } from "../store/appContext";
import { FormCheck } from "react-bootstrap";

export const AddPost = () => {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = [
        "title",
        "make",
        "model",
        "style",
        "fuel",
        "transmission",
        "financing",
        "doors",
        "year",
        "price",
        "description",
        "photos",
      ];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      console.log(data);
      store.actions.NewPost(data);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Model"
              required
              name="model"
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" placeholder="Make" required name="make" />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              name="title"
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>style</Form.Label>
            <Form.Control
              type="text"
              placeholder="Style"
              required
              name="style"
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Fuel</Form.Label>
            <Form.Select name="fuel">
              <option value="gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="hybrid">hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Transmission</Form.Label>
            <Form.Select name="transmission">
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Financing</Form.Label>
            <Form.Check name="financing" />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Doors</Form.Label>
            <Form.Select name="doors">
              <option value="3">3</option>
              <option value="4">4 or more</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              required
              name="year"
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="$0.000"
              required
              name="price"
            />
          </Form.Group>
          <Form.Group as={Col} md="12">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              name="description"
            />
          </Form.Group>
        </Row>
        <div className="d-flex grid gap-3">
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Choose multiple car photos</Form.Label>
            <Form.Control type="file" multiple name="photos" />
          </Form.Group>
        </div>
        <Button type="submit">Agree New Post</Button>
      </Form>
    </div>
  );
};
