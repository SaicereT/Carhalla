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
        navigate("/");
      }
    }
  };
  const handleLogout = () => {
    actions.logOut();
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
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
                <Link to="/accountRecovery">Forgot Password?</Link>
              </div>
            </div>
            <Link to="/formUser">
              <button className="btn btn-primary me-3">Sign up</button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleLogout()}
            >
              Log Out
            </button>
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              ...
            </button>

            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">More Info</h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <a className="dropdown-item" href="#">
                  Crear Publicacion
                </a>
                <a className="dropdown-item" href="#">
                  Favoritos
                </a>
                <a className="dropdown-item" href="#">
                  Publicaciones
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
