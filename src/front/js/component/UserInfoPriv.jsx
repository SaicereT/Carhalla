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
            <h5 className="card-title">Card title</h5>
            <p className="card-text">{props.address}</p>
            <p className="card-text">{props.age}</p>
            <p className="card-text">{props.country}</p>
            <p className="card-text">{props.email}</p>
            <p className="card-text">{props.firstname}</p>
            <p className="card-text">{props.id}</p>
            <p className="card-text">{props.is_active}</p>
            <p className="card-text">{props.lastname}</p>
            <p className="card-text">{props.telnumber}</p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
