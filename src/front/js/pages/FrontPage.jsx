import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "../component/PostCard.jsx";
import { Filter } from "../component/filter.jsx";

export const Frontpage = () => {
  const { store, actions } = useContext(Context);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfPage, setendOfPage] = useState(false);

  const [selectedMakeOption, setSelectedMakeOption] = useState("All");
  const [selectedYearOption, setSelectedYearOption] = useState("All");

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
  const filteredPosts =
    selectedMakeOption === "All" && selectedYearOption === "All"
      ? store.posts
      : store.posts.filter(
          (post) =>
            (selectedMakeOption === "All" ||
              post.make === selectedMakeOption) &&
            (selectedYearOption === "All" || post.year === selectedYearOption)
        );

  const handleMakeOptionChange = (event) => {
    setSelectedMakeOption(event.target.value);
  };

  const handleYearOptionChange = (event) => {
    setSelectedYearOption(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="display-4 ">Carhalla</h1>
      <Filter
        handleMakeFilterChange={handleMakeOptionChange}
        handleYearFilterChange={handleYearOptionChange}
        selectedMakeOption={selectedMakeOption}
        selectedYearOption={selectedYearOption}
      />
      <div className="container ">
        <div className="row display: inline-block;">
          {filteredPosts.map((post) => (
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
