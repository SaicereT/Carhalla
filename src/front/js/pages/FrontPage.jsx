import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "../component/PostCard.jsx";
import { useSearchParams } from "react-router-dom";

export const Frontpage = () => {
  const { store, actions } = useContext(Context);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfPage, setendOfPage] = useState(false);

  useEffect(() => {
    actions.getPosts();
    window.removeEventListener("scroll", eventScroll);
    window.addEventListener("scroll", eventScroll, { passive: true });
    return () => window.removeEventListener("scroll", eventScroll);
  }, []);

  useEffect(() => {
    if (store.accessToken) actions.getUserFavorites();
  }, [store.accessToken]);

  useEffect(() => {
    if (endOfPage) {
      actions.getPosts(pageNumber + 1, true).then((result) => {
        if (result) setPageNumber(pageNumber + 1);
      });
    }
  }, [endOfPage]);

  function eventScroll(e) {
    let pos = window.scrollY + window.innerHeight;
    let height = document.getElementById("app").scrollHeight;
    if (pos == height) {
      setendOfPage(true);
    } else {
      setendOfPage(false);
    }
  }

  return (
    <div className="jumbotron">
      <h1 className="display-4 ">Home Page</h1>
      <div className="container">
        <div className="row justify-content-between">
          {store.posts.map((post) => (
            <div className="col-4 mb-3  " key={post.post_id}>
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
    </div>
  );
};
