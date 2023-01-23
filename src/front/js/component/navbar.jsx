import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = ["email", "password"];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      actions.LogOn(data);
      let resp = await actions.LogOn(data);
      if (resp) {
        navigate("/");
      }
    }
  };
  const handleLogout = () => {
    let access = store.accessToken;
    actions.logOut(access);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 ms-3">React Boilerplate</span>
        </Link>
        <Link to="/profile_page">
          <span className="navbar-brand mb-0 h1 ms-3">profile</span>
        </Link>
        <Link to="/addPost">
          <span className="navbar-brand mb-0 h1 ms-3">Newpost</span>
        </Link>
        {store.accessToken == "" || null || undefined ? (
          <div className="ml-auto d-flex me-3">
            <div className="dropdown me-2">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                Log in
              </button>
              <div className="dropdown-menu px-3">
                <form className="" onSubmit={(event) => handleSubmit(event)}>
                  <div className="mb-1">
                    <label
                      forhtml="exampleDropdownFormEmail2"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      id="exampleDropdownFormEmail2"
                      placeholder="Email here"
                      name="email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      forhtml="exampleDropdownFormPassword2"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      id="exampleDropdownFormPassword2"
                      placeholder="Password here"
                      name="password"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mb-2">
                    Submit
                  </button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
            <Link to="/formUser">
              <button className="btn btn-primary">Sign up</button>
            </Link>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleLogout()}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};
