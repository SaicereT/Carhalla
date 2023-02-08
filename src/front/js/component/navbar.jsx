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
              className="btn btn-primary mx-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Más Info  <i class="bi bi-info-circle"></i>
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Menú</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
              <Link className="dropdown-item" to="/addPost">
                  Agregar Publicacion
                </Link>
                <Link className="dropdown-item" to="/profile_pagePriv/profile">
                  Perfil
                </Link>
                <Link className="dropdown-item" to="/profile_pagePriv/posts">
                  Publicaciones
                </Link>
                <Link
                  className="dropdown-item"
                  to="/profile_pagePriv/favorites"
                >
                  Favoritos
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
