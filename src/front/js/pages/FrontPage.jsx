import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PostCard from "../component/PostCard.jsx";
import { Filter } from "../component/filter.jsx";
import frontpage from "../../styles/frontpage.css";

export const Frontpage = () => {
  const { store, actions } = useContext(Context);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfPage, setendOfPage] = useState(false);
  const [selectedMakeOption, setSelectedMakeOption] = useState("All");
  const [selectedYearOption, setSelectedYearOption] = useState("All");
  const [selectedStyleOption, setSelectedStyleOption] = useState("All");
  const [selectedFuelOption, setSelectedFuelOption] = useState("All");
  const [selectedDoorsOption, setSelectedDoorsOption] = useState("All");
  const [selectedTransmissionOption, setSelectedTransmissionOption] =
    useState("All");

  useEffect(() => {
    actions.getPosts();
    window.removeEventListener("scroll", eventScroll);
    window.addEventListener("scroll", eventScroll, { passive: true });
    return () => window.removeEventListener("scroll", eventScroll);
  }, [Filter]);

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
  function filteredPosts() {
    let output = store.posts;
    if (selectedMakeOption !== "All") {
      output = output.filter((post) => post.make === selectedMakeOption);
    }
    if (selectedYearOption !== "All") {
      output = output.filter(
        (post) => post.year.toString() === selectedYearOption
      );
    }
    if (selectedStyleOption !== "All") {
      output = output.filter(
        (post) => post.style.toString() === selectedStyleOption
      );
    }
    if (selectedFuelOption !== "All") {
      output = output.filter(
        (post) => post.fuel.toString() === selectedFuelOption
      );
    }
    if (selectedTransmissionOption !== "All") {
      output = output.filter(
        (post) => post.transmission.toString() === selectedTransmissionOption
      );
    }
    if (selectedDoorsOption !== "All") {
      output = output.filter(
        (post) => post.doors.toString() === selectedDoorsOption
      );
    }

    return output;
  }

  const handleMakeOptionChange = (event) => {
    setSelectedMakeOption(event.target.value);
  };

  const handleYearOptionChange = (event) => {
    setSelectedYearOption(event.target.value);
  };
  const handleStyleOptionChange = (event) => {
    setSelectedStyleOption(event.target.value);
  };
  const handleFuelOptionChange = (event) => {
    setSelectedFuelOption(event.target.value);
  };
  const handleTransmissionOptionChange = (event) => {
    setSelectedTransmissionOption(event.target.value);
  };
  const handleDoorsOptionChange = (event) => {
    setSelectedDoorsOption(event.target.value);
  };

  return (
    <div className="container-fluid me-5 ">
      <h1>Front Page</h1>
      <div className="d-flex">
        <div className="postcard-container">
          <div className="row">
            <div className="col-lg-3 filter-container">
              <Filter
                handleMakeFilterChange={handleMakeOptionChange}
                handleYearFilterChange={handleYearOptionChange}
                handleStyleFilterChange={handleStyleOptionChange}
                handleFuelFilterChange={handleFuelOptionChange}
                handleTransmissionFilterChange={handleTransmissionOptionChange}
                handleDoorsFilterChange={handleDoorsOptionChange}
                selectedMakeOption={selectedMakeOption}
                selectedYearOption={selectedYearOption}
                selectedStyleOption={selectedStyleOption}
                selectedFuelOption={selectedFuelOption}
                selectedTransmissionOption={selectedTransmissionOption}
                selectedDoorsOption={selectedDoorsOption}
              />
            </div>
            {filteredPosts().map((post) => (
              <div className="col-lg-3 mb-3" key={post.post_id}>
                <PostCard
                  make={post.make}
                  model={post.model}
                  id={post.post_id}
                  price={post.price}
                  title={post.title}
                  year={post.year}
                  premium={post.premium}
                  images={post.images}
                  type={"Homeposts"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
