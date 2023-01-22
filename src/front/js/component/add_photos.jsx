import Form from "react-bootstrap/Form";
import React from "react";

export function AddPhotos() {
  return (
    <div className="container">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose a single photo</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Choose multiple photos</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
    </div>
  );
}
