import React from "react";
import "./Empty.css";

const Empty = ({ user }) => {
  const { name, profile_pic, status } = user;
  const removePrefix = name.replace(/\b(dr|mr|mrs|ms|miss)[.\s]\s?/gi, "");
  const firstName = removePrefix.split(" ")[0];

  return (
    <div className="Empty">
      <div className="Empty__content">
        <img src={profile_pic} alt={name} className="Empty__img" />
        <h1 className="Empty__name">Welcome, {firstName}.</h1>
        <p className="Empty__info">
          Search for someone to start chatting with or go to Contacts to see who
          is available.
        </p>
      </div>
      <div className="Empty__status-container">
        <p className="Empty__status">
          <b>Status: </b>
          {status}
        </p>
      </div>
    </div>
  );
};

export default Empty;
