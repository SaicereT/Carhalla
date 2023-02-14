import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AccountRecovery = () => {
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let formData = new FormData(event.target);
      let data = {};
      let campos = ["email"];
      campos.forEach((campo) => {
        data[campo] = formData.get(campo);
      });
      console.log(data);
      actions.requestPassword(data);
    }
  };
  return (
    <div
      className="container col-md4"
      style={{ width: "400px", height: "500px" }}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3">
          <h2 className="form-title justifycontent-center">CarHalla</h2>
          <h4 className="form-subtitle mt-4"> Recuperación de Cuenta </h4>
          <label for="exampleInputEmail1" className="form-label mt-3">
            Introduce tu dirección de correo electrónico
          </label>
          <input
            name="email"
            type="email"
            className="form-control mt-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Correo Electrónico"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <button type="submit" className="btn btn-primary button4">
          Enviar
        </button>
      </form>
    </div>
  );
};
