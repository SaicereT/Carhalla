import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "./PostCard.jsx";

export const DetailCar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPostsDetail();
  }, []);
  return (
    <div className="jumbotron">
      <h1 className="display-4">Home Page</h1>
      <div className="container">
        <div className="row justify-content-between">
          {store.posts.map((post) => (
            <div className="col-4 mb-3" key={post.post_id}>
              <PostCard
                make={post.make}
                model={post.model}
                id={post.post_id}
                price={post.price}
                title={post.title}
                year={post.year}
                style={post.style}
                fuel={post.fuel}
                transmission={post.transmission}
                financing={post.financing}
                doors={post.doors}
                description={post.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
