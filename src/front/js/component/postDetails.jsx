import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "./PostCard.jsx";

export const PostDetails = (props) => {
  const { store, actions } = useContext(Context);
  const texto = {
    title:"Share Post",
    url:`https://3000-saiceret-carhalla-rl7jvy2d9t0.ws-us87.gitpod.io/posts/${props.id}`
  }
  function shareAcross(object) {
    if (navigator.share){
      navigator 
        .share(object)
        .then(()=> console.log('Successful share'))
        .cath(error => console.log('Error Sharing', error));
    }
    else {
      console.log('No Soportado');
    }
  }

  useEffect(() => {
    if (store.accessToken) actions.getUserFavorites();
  }, [store.accessToken]);

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">Inserte imagen aqui</div>
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
            <p className="card-text">Transmission Type: {props.transmission}</p>
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
            <button onClick={()=> shareAcross(texto)}>
              Share Post
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
