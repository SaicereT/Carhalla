import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = ["email", "password"];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      console.log(data);
      actions.LogOn(data);
    }
  };
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/formUser">
            <button className="btn btn-primary">Sing in</button>
          </Link>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Log on
            </button>
            <form
              className="dropdown-menu p-4"
              onSubmit={(event) => handleSubmit(event)}
            >
              <div className="mb-6">
                <label
                  forhtml="exampleDropdownFormEmail2"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail2"
                  placeholder="email@example.com"
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
                  className="form-control"
                  id="exampleDropdownFormPassword2"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                enter log
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};
