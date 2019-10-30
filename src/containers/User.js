import React from "react";
import { setActiveUserId, toggleSidebar } from "../actions";
import "./User.css";
import { connect } from "react-redux";

const User = ({
  user,
  handleUserClick,
  activeUserId,
  sidebarOpen,
  toggleSidebar
}) => {
  const { name, profile_pic, status, user_id } = user;
  const isSidebarOpen = sidebarOpen ? " visible" : " hidden";

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleUserClick(user_id);
    }
  };

  const handleClick = user_id => {
    if (window.innerWidth < 750 && sidebarOpen) {
      toggleSidebar();
    }
    handleUserClick(user_id);
  };

  return (
    <div
      className={
        "User" + (user_id === activeUserId ? " active" : "") + isSidebarOpen
      }
      // onClick={handleUserClick.bind(null, user_id)}
      onClick={handleClick.bind(null, user_id)}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <img src={profile_pic} alt={name} className="User__pic" />
      <div className="User__details">
        <p className="User__details-name">{name}</p>
        <p className="User__details-status">{status}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { activeUserId, sidebarOpen } = state;
  return {
    activeUserId: activeUserId,
    sidebarOpen: sidebarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserClick: user_id => {
      dispatch(setActiveUserId(user_id));
    },
    toggleSidebar: value => {
      dispatch(toggleSidebar(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
