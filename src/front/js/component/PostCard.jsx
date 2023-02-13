import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PostCard = (props) => {
  const { store, actions } = useContext(Context);
  /*agrega el prop de pago en vez del financiado y en vez de false el prop para que lo iguale "false lo oculta, true lo muestra"*/
  let boost = props.premium;
  return (
    <div className="card">
      <div
        id={`carousel${props.id}Controls`}
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {props.images.map((image, index) => (
            <div
              className={`carousel-item ${index == 0 ? "active" : ""}`}
              key={image.resource_path}
            >
              <img src={image.signed_url} className="w-100" alt="..." />
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
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">Description</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Make: {props.make}</li>
        <li className="list-group-item">Model: {props.model}</li>
        <li className="list-group-item">Price: {props.price}</li>
        <li className="list-group-item">Year: {props.year}</li>
        {boost && (
          <li className="list-group-item tracking-in-contract">
            <i className="bi bi-lightning-charge">Premium</i> {props.premium}
          </li>
        )}
      </ul>
      {store.accessToken == "" || null || undefined ? (
        <div className="card-body d-flex justify-content-between">
          <Link to={`/posts/${props.id}`}>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </Link>
        </div>
      ) : (
        <div className="card-body d-flex justify-content-between">
          <Link to={`/posts/${props.id}`}>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => actions.handleFavorites(props.id)}
          >
            <i className="bi bi-heart-fill"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
