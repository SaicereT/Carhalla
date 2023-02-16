import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const UserInfoPub = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card mb-3">
      {props.email ? (
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Profile Info</h5>
              <p className="card-text">Email: {props.email}</p>
              <p className="card-text">Username: {props.username}</p>
              <p className="card-text">Telephone Number: {props.telnumber}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Loading Info...</h5>
        </div>
      )}
    </div>
  );
};

export default UserInfoPub;
