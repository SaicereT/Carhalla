import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { PostDetails } from "../component/postDetails.jsx";

export const PostDetailsPage = () => {
  const { store, actions } = useContext(Context);
  const { postid } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    actions.getPostDetails(postid).then((resp) => setData(resp));
  }, []);
  return (
    <div className="jumbotron">
      <h1 className="display-4">Home Page</h1>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4 mb-3">
            <PostDetails
              make={data.make}
              model={data.model}
              id={data.post_id}
              price={data.price}
              title={data.title}
              year={data.year}
              style={data.style}
              fuel={data.fuel}
              transmission={data.transmission}
              financing={data.financing}
              doors={data.doors}
              description={data.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
