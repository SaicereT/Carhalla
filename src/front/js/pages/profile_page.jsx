import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserPostsTabPub from "../component/UserPostsTabPub.jsx";
import UserInfoPub from "../component/UserInfoPub.jsx";
import { Context } from "../store/appContext.js";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { userid } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (store.accessToken)
      actions.getUserInfoPub(userid).then((resp) => setData(resp));
  }, [store.accessToken]);

  return (
    <div className="container">
      <div className="float-md-start  " style={{ marginRight: "25px" }}>
        <img
          src="https://picsum.photos/id/237/200/300"
          style={{ borderRadius: "70px", marginTop: "50px" }}
          alt="/"
        />
      </div>
      <ul
        className="nav nav-tabs"
        id="myTab"
        role="tablist"
        style={{ marginTop: "50px" }}
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            {data.username}'s Profile Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            {data.username}'s posts
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab show active"
          tabIndex="0"
        >
          <UserInfoPub
            email={data.email}
            username={data.username}
            id={userid}
            is_active={data.is_active}
            telnumber={data.telnumber}
          />
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          <UserPostsTabPub userid={userid} />
        </div>
      </div>
    </div>
  );
};
