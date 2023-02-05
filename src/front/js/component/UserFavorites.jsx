import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PostCard from "./PostCard.jsx";

const UserFavorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.accessToken) actions.getUserFavorites();
  }, [store.accessToken]);
  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-between">
        {store.userFavorites.map((post) => (
          <div className="col-4 mb-3" key={post.post_id}>
            <PostCard
              make={post.make}
              model={post.model}
              id={post.post_id}
              price={post.price}
              title={post.title}
              year={post.year}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFavorites;
