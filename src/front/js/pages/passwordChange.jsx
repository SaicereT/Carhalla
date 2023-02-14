import React, { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const { store, actions } = useContext(Context);
  var { token } = useParams();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = ["password", "email"];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      token = searchParams.get("token");
      console.log(token);
      let resp = await actions.passwordChange(data, token);
      if (resp) {
        actions.LogOn(data);
        let respo = await actions.LogOn(data);
        if (respo) {
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="container-flex">
      {/* {mensaje ? (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      ) : (
        ""
      )} */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <div
          className="container col-md4 mt-5"
          style={{ width: "400px", height: "500px" }}
        >
          <label for="exampleInputpassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputpassword1"
            aria-describedby="passwordHelp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlfor="verification" className="form-label">
            Verify your Password
          </label>
          <input
            type="password"
            className="form-control"
            id="verification"
            aria-describedby="passwordHelp"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
          />
          <label for="exampleInputemail1" className="form-label">
            Confirm your Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputemail1"
            aria-describedby="emailHelp"
          />
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
