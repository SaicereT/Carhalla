import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PostCard = (props) => {
  /*agrega el prop de pago en vez del financiado y en vez de false el prop para que lo iguale "false lo oculta, true lo muestra"*/
  let boost = true;
  return (
    <div className="card">
      <img
        src="https://i.picsum.photos/id/670/500/500.jpg?hmac=N38FiXBMkkVNLkU8iurtSmZLgBc-wDkQJ5yCaCwJrIk"
        className="card-img-top"
        alt="..."
      />
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
          <li className="list-group-item">
            <i class="bi bi-lightning-charge">Premium</i> {props.financing}
          </li>
        )}
      </ul>

      <div className="card-body d-flex justify-content-between">
        <Link to={`/posts/${props.id}`}>
          <button type="button" className="btn btn-outline-info">
            Info
          </button>
        </Link>
        <button type="button" className="btn btn-outline-danger">
          <i className="bi bi-heart-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
