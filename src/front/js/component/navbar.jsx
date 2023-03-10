import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import carhalalogo from "../../img/carhalalogo.png";

export const Navbar = () => {
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
        navigate("profile_pagePriv/profile");
      }
    }
  };
  const handleLogout = async () => {
    let resp = await actions.logOut();
    if (resp) {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark   ">
      <div className="container-fluid d-flex bd-highlight mb-3">
        <Link to="/">
          <img
            style={{ height: "80px" }}
            className="ms-2"
            src={carhalalogo}
            alt="/"
          />
        </Link>
        {store.accessToken == "" || null || undefined ? (
          <div className="ms-auto p-2 d-flex bd-highlight">
            <div className="dropdown me-3">
              <button
                type="button"
                className=" button4 btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                Log in
              </button>
              <div className="dropstyle  dropdown-menu px-3 mt-5">
                <form className="" onSubmit={(event) => handleSubmit(event)}>
                  <div className="mb-1">
                    <label
                      forhtml="exampleDropdownFormEmail2"
                      className="form-label"
                    >
                      <br></br>
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      id="exampleDropdownFormEmail2"
                      placeholder="Email"
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
                      placeholder="Password"
                      name="password"
                    />
                  </div>

                  <button
                    type="submit"
                    className=" button4 btn btn-primary mb-2"
                  >
                    Submit
                  </button>
                </form>
                <div className="dropdown-divider"></div>
                <Link to="/accountRecovery">Forgot your password?</Link>
              </div>
            </div>
            <Link to="/formUser">
              <button className=" button3 btn btn-success me-3">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="button2 btn btn-danger"
              onClick={() => handleLogout()}
            >
              Log Out
            </button>
            <button
              className="miBoton btn btn-primary mx-3  "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Main Menu
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Menu</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body ">
                <Link className="dropdown-item" to="/addPost">
                  Create a new post
                </Link>
                <Link
                  className="  dropdown-item"
                  to="/profile_pagePriv/profile"
                >
                  Profile
                </Link>
                <Link
                  className="button5 dropdown-item"
                  to="/profile_pagePriv/posts"
                >
                  Posts
                </Link>
                <Link
                  className="dropdown-item"
                  to="/profile_pagePriv/favorites"
                >
                  Saved Posts
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
