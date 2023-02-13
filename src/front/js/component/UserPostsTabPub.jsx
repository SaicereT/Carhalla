import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PostCard from "./PostCard.jsx";

const UserPostsTabPub = (props) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.accessToken) actions.specificUserPostsPub(props.userid);
  }, [store.accessToken]);
  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-between">
        {store.userPostsPub.map((post) => (
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
    </div>
  );
};

export default UserPostsTabPub;
