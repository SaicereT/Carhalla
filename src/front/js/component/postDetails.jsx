import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "./PostCard.jsx";

export const PostDetails = (props) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.accessToken) actions.getUserFavorites();
  }, [store.accessToken]);
  return (
    <div className="card mb-3">
      {props.id ? (
        <div className="row g-0">
          <div
            id={`carousel${props.id}Controls`}
            className="carousel slide col-md-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {props.images.map((image, index) => (
                <div
                  className={`carousel-item ${index == 0 ? "active" : ""}`}
                  key={image.resource_path}
                >
                  <img src={image.signed_url} className="w-100" alt="" />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel${props.id}Controls`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carousel${props.id}Controls`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">Make: {props.make}</p>
              <p className="card-text">Model: {props.model}</p>
              <p className="card-text">Price: {props.price}</p>
              <p className="card-text">Miles: {props.miles}</p>
              <p className="card-text">Year: {props.year}</p>
              <p className="card-text">Style: {props.style}</p>
              <p className="card-text">Fuel Type: {props.fuel}</p>
              <p className="card-text">
                Transmission Type: {props.transmission}
              </p>
              {props.financing == true ? (
                <p className="card-text">Financing: Yes</p>
              ) : (
                <p className="card-text">Financing: No</p>
              )}
              <p className="card-text">Doors: {props.doors}</p>
              <p className="card-text">Description: {props.description}</p>
              {store.accessToken == "" || null || undefined ? (
                <div className="card-body d-flex justify-content-between">
                  {" "}
                  <Link to={-1}>
                    <button type="button" className="btn btn-outline-primary">
                      Go back!
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="card-body d-flex justify-content-between">
                  {" "}
                  <Link to={-1}>
                    <button type="button" className="btn btn-outline-primary">
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
                  <a
                    className="btn btn-outline-success"
                    role="button"
                    href={`https://api.whatsapp.com/send?phone=${props.telnumber}`}
                  >
                    <i className="bi bi-whatsapp">
                      {" "}
                      Chat with {props.username}
                    </i>
                  </a>
                  <Link to={`/profile_page/${props.userid}`}>
                    <button type="button" className="btn btn-outline-warning">
                      View {props.username}'s account
                    </button>
                  </Link>
                </div>
              )}

              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Loading Info...</h5>
        </div>
      )}
    </div>
  );
};
