import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PostCardPrivate from "./PostCard_private.jsx";

const UserPostsTab = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.accessToken) actions.specificUserPosts();
  }, [store.accessToken]);
  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-between">
        {store.userPosts.map((post) => (
          <div className="col-lg-4 mb-3" key={post.post_id}>
            <PostCardPrivate
              make={post.make}
              model={post.model}
              id={post.post_id}
              price={post.price}
              title={post.title}
              year={post.year}
              premium={post.premium}
              images={post.images}
              type={"Privposts"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostsTab;
