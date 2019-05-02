import React from "react";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const { profile_pic, name } = user;
  const removePrefix = name.replace(/\b(dr|mr|mrs|ms)[.\s]\s?/gi, "");
  const firstName = removePrefix.split(" ")[0];

  return (
    <div className="Navbar">
      <div className="logo" />
      <div className="user-pic">
        <span className="user-name">{firstName}</span>
        <img src={profile_pic} alt={name} className="profile-pic" />
      </div>
    </div>
  );
};

export default Navbar;
