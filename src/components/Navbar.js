import React from "react";
import "./Navbar.css";
import chatbox from "../images/chatbox.svg";

const Navbar = ({ user }) => {
  const { profile_pic, name } = user;
  const removePrefix = name.replace(/\b(dr|mr|mrs|ms)[.\s]\s?/gi, "");
  const firstName = removePrefix.split(" ")[0];

  return (
    <div className="Navbar">
        <img src={chatbox} alt="Chatbox logo" className="logo"/>
      <div className="user-pic">
        <span className="user-name">{firstName}</span>
        <img src={profile_pic} alt={name} className="profile-pic" />
      </div>
    </div>
  );
};

export default Navbar;
