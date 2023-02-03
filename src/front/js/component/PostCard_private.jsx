import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PostCardPrivate = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card" /*style="width: 18rem;"*/>
      <img
        src="https://i.picsum.photos/id/670/500/500.jpg?hmac=N38FiXBMkkVNLkU8iurtSmZLgBc-wDkQJ5yCaCwJrIk"
        className="card-img-top"
        alt="..."
      />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <button class="btn btn-success">
            Impulse your post {"  "}
            <i class="bi bi-rocket-takeoff"></i>
          </button>
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
        <button type="button" className="btn btn-outline-danger">
          <i className="bi bi-heart-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default PostCardPrivate;
