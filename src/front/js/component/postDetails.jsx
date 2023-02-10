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
      <div className="row g-0">
        <div className="col-md-4">Inserte imagen aqui</div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">{props.make}</p>
            <p className="card-text">{props.model}</p>
            <p className="card-text">{props.price}</p>
            <p className="card-text">{props.title}</p>
            <p className="card-text">{props.year}</p>
            <p className="card-text">{props.style}</p>
            <p className="card-text">{props.fuel}</p>
            <p className="card-text">{props.transmission}</p>
            <p className="card-text">{props.financing}</p>
            <p className="card-text">{props.doors}</p>
            <p className="card-text">{props.description}</p>
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
                  <i className="bi bi-whatsapp"> Chat with {props.username}</i>
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
    </div>
  );
};
