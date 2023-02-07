import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const UserInfo = (props) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Profile Info</h5>
            <p className="card-text">Address: {props.address}</p>
            <p className="card-text">Age: {props.age}</p>
            <p className="card-text">Country: {props.country}</p>
            <p className="card-text">Email: {props.email}</p>
            <p className="card-text">First Name:{props.firstname}</p>
            <p className="card-text">Last Name: {props.lastname}</p>
            <p className="card-text">Telephone Number: {props.telnumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
