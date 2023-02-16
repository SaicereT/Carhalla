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
      {store.userFavorites ? (
        <div className="row justify-content-between">
          {store.userFavorites.map((post) => (
            <div className="col-lg-4 mb-3" key={post.post_id}>
              <PostCard
                make={post.make}
                model={post.model}
                id={post.post_id}
                price={post.price}
                title={post.title}
                year={post.year}
                images={post.images}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Loading Info...</h5>
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
