import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserPostsTabPriv from "../component/UserPostsTabPriv.jsx";
import UserInfoPriv from "../component/UserInfoPriv.jsx";
import UserFavorites from "../component/UserFavorites.jsx";
import { Context } from "../store/appContext.js";

export const ProfilePriv = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const { tabulacion } = useParams();

  useEffect(() => {
    if (store.accessToken) actions.getUserInfo().then((resp) => setData(resp));
    var offcanvasTab = document.querySelector("#" + tabulacion);
    var tab = new bootstrap.Tab(offcanvasTab);
    tab.show();
  }, [store.accessToken]);

  useEffect(() => {
    var offcanvasTab = document.querySelector("#" + tabulacion);
    var tab = new bootstrap.Tab(offcanvasTab);
    tab.show();
  }, [tabulacion])

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
            id="profile"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Profile Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="posts"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            My posts
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="favorites"
            data-bs-toggle="tab"
            data-bs-target="#favorite-tab-pane"
            type="button"
            role="tab"
            aria-controls="favorite-tab-pane"
            aria-selected="false"
          >
            Favorites
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="profile"
          tabIndex="0"
        >
          <UserInfoPriv
            address={data.address}
            age={data.age}
            country={data.country}
            email={data.email}
            firstname={data.firstname}
            id={data.id}
            is_active={data.is_active}
            lastname={data.lastname}
            telnumber={data.telnumber}
          />
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="posts"
          tabIndex="0"
        >
          <UserPostsTabPriv />
        </div>
        <div
          className="tab-pane fade"
          id="favorite-tab-pane"
          role="tabpanel"
          aria-labelledby="favorites"
          tabIndex="0"
        >
          <UserFavorites />
        </div>
      </div>
    </div>
  );
};
