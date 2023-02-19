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
      if (resp) {
        navigate(0);
      } else {
        return;
      }
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
              <Link to={-1}>
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
                            <Form.Select name="make">
                              <option value="">No Update</option>
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
                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Style</Form.Label>
                            <Form.Select name="style">
                              <option value="">No Update</option>
                              <option value="Sedan">Sedan</option>
                              <option value="Hatchback">Hatchback</option>
                              <option value="SUV">SUV</option>
                              <option value="Wagon">Wagon</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Fuel</Form.Label>
                            <Form.Select name="fuel">
                              <option value="">No Update</option>
                              <option value="gasoline">Gasoline</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Electric">Electric</option>
                              <option value="hybrid">Hybrid</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group as={Col} md="4" className="mb-1">
                            <Form.Label>Transmission</Form.Label>
                            <Form.Select name="transmission">
                              <option value="">No Update</option>
                              <option value="Manual">Manual</option>
                              <option value="Automatic">Automatic</option>
                              <option value="CVT">CVT</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-1">
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
                            <Form.Select name="year">
                              <option value="">No update</option>
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
