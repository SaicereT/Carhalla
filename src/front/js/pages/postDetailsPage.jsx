import React, { useState, useEffect, useContext } from "react";
import PropTypes, { instanceOf } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { PostDetails } from "../component/postDetails.jsx";

export const PostDetailsPage = () => {
  const [data, setData] = useState({});
  const { postid } = useParams();
  const { store, actions } = useContext(Context);
  useEffect(() => {
    const fetchDetails = async () => {
      let info = await actions.getPostDetails(postid);
      setData(info);
    };
    fetchDetails();
  }, []);

  return (
    <div className="container">
      <h1 className="display-4">Details</h1>
      <div className="row justify-content-between">
        <PostDetails
          make={data?.make}
          username={data?.username}
          userid={data?.user_id}
          model={data?.model}
          miles={data?.miles}
          id={data?.post_id}
          price={data?.price}
          title={data?.title}
          year={data?.year}
          style={data?.style}
          fuel={data?.fuel}
          transmission={data?.transmission}
          financing={data?.financing}
          doors={data?.doors}
          description={data?.description}
          images={data?.images}
        />
      </div>
    </div>
  );
};
