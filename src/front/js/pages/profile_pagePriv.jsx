import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserPostsTabPriv from "../component/UserPostsTabPriv.jsx";
import UserInfoPriv from "../component/UserInfoPriv.jsx";
import UserFavorites from "../component/UserFavorites.jsx";
import { Context } from "../store/appContext.js";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const ProfilePriv = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const { tabulacion } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.accessToken) {
      actions.getUserInfo().then((resp) => setData(resp));
      var offcanvasTab = document.querySelector("#" + tabulacion);
      var tab = new bootstrap.Tab(offcanvasTab);
      tab.show();
    }
  }, [store.accessToken]);

  useEffect(() => {
    var offcanvasTab = document.querySelector("#" + tabulacion);
    var tab = new bootstrap.Tab(offcanvasTab);
    tab.show();
  }, [tabulacion]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      console.log(formData);
      let file = event.target.elements["profilePic"].files;
      if (file == undefined || "" || null) return console.log("Empty Value");
      let resp = actions.updateProfilePic(formData);
      if (resp) {
        navigate(0);
      } else {
        return;
      }
    }
  };

  return (
    <div className="container-fluid me-3">
      <div className="float-md-start  " style={{ marginRight: "25px" }}>
        <img
          tabIndex="-1"
          src={store.profilePicPriv.signed_url}
          className="rounded-circle mt-3"
          style={{ height: "250px", width: "250px" }}
          alt="/"
        />
        <Form onSubmit={(event) => handleSubmit(event)}>
          <div className="ms-5 mt-2">
            <button
              type="button"
              className="btn btn-outline-primary ms-1"
              data-bs-toggle="modal"
              data-bs-target="#picModal"
            >
              Update Picture <i className="bi bi-pencil-square"></i>
            </button>
          </div>
          <div
            className="modal fade"
            id="picModal"
            tabIndex="-2"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Profile Picture
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex grid gap-3">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose new profile picture</Form.Label>
                      <Form.Control type="file" multiple name="profilePic" />
                    </Form.Group>
                  </div>
                </div>
                <div className="modal-footer d-flex">
                  <div className="p-2 flex-grow-1">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      aria-label="Close"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Upload picture
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
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
            username={data.username}
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
