import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Paypal from "./paypal.jsx";

const PostCardPrivate = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card" /*style="width: 18rem;"*/>
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
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Impulse your post <strong>10$</strong>{" "}
            <i className="bi bi-rocket-takeoff"></i>
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
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Do you want your publication to reach more users?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Paypal />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">Description</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Make: {props.make}</li>
        <li className="list-group-item">Model: {props.model}</li>
        <li className="list-group-item">Price: {props.price}</li>
        <li className="list-group-item">Year: {props.year}</li>
      </ul>

      <div className="card-body d-flex justify-content-between">
        <Link to={`/postsprivate/${props.id}`}>
          <button type="button" className="btn btn-outline-info">
            Info
          </button>
        </Link>
        <Link to={"/profile_pagePriv"}>
          <button
            className="btn btn-warning"
            onClick={() => actions.DeletePost(props.id)}
          >
            Delete post
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
    </div>
  );
};

export default PostCardPrivate;
