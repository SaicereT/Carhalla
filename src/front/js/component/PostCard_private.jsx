import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PostCardPrivate = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card" /*style="width: 18rem;"*/>
      <img
        src="https://picsum.photos/500/500"
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
