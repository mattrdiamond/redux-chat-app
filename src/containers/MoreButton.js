import React from "react";
import "./MoreButton.css";
import { connect } from "react-redux";
import { toggleMore } from "../actions";

// make this a component not a container
const MoreButton = ({ toggleMoreBtn, showMore, message, handleDeleteMsg }) => {
  const handleToggle = e => {
    toggleMoreBtn(e);
  };

  const handleMouseDown = message => {
    handleDeleteMsg(message);
  };

  return (
    // <div className="container">
    <div className={"more" + (showMore ? " show-more-menu" : "")}>
      <button
        id="more-btn"
        className="more-btn"
        onClick={handleToggle}
        onBlur={handleToggle}
      >
        <span className="more-dot" />
        <span className="more-dot" />
        <span className="more-dot" />
      </button>
      <div className="more-menu">
        <div className="more-menu-caret">
          <div className="more-menu-caret-outer" />
          <div className="more-menu-caret-inner" />
        </div>
        <ul
          className="more-menu-items"
          tabIndex="-1"
          role="menu"
          aria-labelledby="more-btn"
          aria-hidden="true"
        >
          <li className="more-menu-item" role="presentation">
            <button type="button" className="more-menu-btn" role="menuitem">
              1. Edit
            </button>
          </li>
          <li className="more-menu-item" role="presentation">
            <button
              type="button"
              className="more-menu-btn"
              role="menuitem"
              onMouseDown={handleMouseDown.bind(this, message)}
            >
              2. Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default MoreButton;
