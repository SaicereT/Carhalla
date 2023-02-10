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
            <Form.Select name="make">
              <option value="BMW">BMW</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="FIAT">FIAT</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Tesla">Tesla</option>
              <option value="Toyota">Toyota</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Ford">Ford</option>
            </Form.Select>
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
            <Form.Select name="style">
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Wagon">Wagon</option>
            </Form.Select>
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
            <Form.Select name="year">
              <option value="1980">1980</option>
              <option value="1981">1981</option>
              <option value="1982">1982</option>
              <option value="1983">1983</option>
              <option value="1984">1984</option>
              <option value="1985">1985</option>
              <option value="1986">1986</option>
              <option value="1987">1987</option>
              <option value="1988">1988</option>
              <option value="1989">1989</option>
              <option value="1990">1990</option>
              <option value="1991">1991</option>
              <option value="1992">1992</option>
              <option value="1993">1993</option>
              <option value="1994">1994</option>
              <option value="1995">1995</option>
              <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Miles</Form.Label>
            <Form.Control
              type="number"
              placeholder="Miles"
              required
              name="miles"
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
                  Skip
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Upload pictures
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
