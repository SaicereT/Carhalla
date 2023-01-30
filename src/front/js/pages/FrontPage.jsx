import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "../component/PostCard.jsx";
import { useSearchParams } from "react-router-dom";

export const Frontpage = () => {
  const { store, actions } = useContext(Context);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    actions.getPosts();
    window.removeEventListener("scroll", eventScroll);
    window.addEventListener("scroll", eventScroll, { passive: true });
    return () => window.removeEventListener("scroll", eventScroll);
  }, []);

  function eventScroll(e) {
    let pos = window.scrollY + window.innerHeight;
    let height = document.getElementById("app").scrollHeight;
    if (pos == height) {
      console.log("End of Page");
      setPageNumber(pageNumber + 1);
      console.log(pageNumber);
    }
  }

  function addPage() {
    setPageNumber(pageNumber + 1);
    console.log(pageNumber);
  }
  return (
    <div className="jumbotron">
      <h1 className="display-4">Home Page</h1>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addPage()}
        >
          Add page
        </button>
        <div className="row justify-content-between">
          {store.posts.map((post) => (
            <div className="col-4 mb-3 " key={post.post_id}>
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
