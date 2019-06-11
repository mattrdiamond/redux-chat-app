import React from "react";
import "./MoreButton.css";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import { toggleMore } from "../actions";

// make this a component not a container
const MoreButton = ({
  toggleMoreBtn,
  showMore,
  message,
  messages,
  handleDeleteMsg,
  handleEditMode,
  activeUserId
}) => {
  const handleToggle = e => {
    toggleMoreBtn(e);
  };

  const handleDelete = message => {
    handleDeleteMsg(message);
    console.log("delete message", message);
  };

  const handleEdit = () => {
    handleEditMode();
  };

  const checkIfLastMsg = () => {
    const userMessages = messages[activeUserId];
    const lastMessage = Object.keys(userMessages).length;
    if (message.number + 1 === lastMessage) {
      return " last";
    }
    return "";
  };

  return (
    // <div className="container">
    <div
      className={
        "more" + (showMore ? " show-more-menu" : "") + checkIfLastMsg()
      }
    >
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
        <div className="triangle-with-shadow">
          {/*<div className="more-menu-caret triangle-with-shadow">
          <div className="more-menu-caret-outer" />
          <div className="more-menu-caret-inner" />*/}
        </div>
        <ul
          className="more-menu-items"
          tabIndex="-1"
          role="menu"
          aria-labelledby="more-btn"
          aria-hidden={showMore ? "false" : "true"}
        >
          <li className="more-menu-item" role="presentation">
            <button
              type="button"
              className="more-menu-btn"
              role="menuitem"
              // onMouseDown={handleEdit.bind(this, message)}
              onMouseDown={handleEdit}
            >
              <Icon icon="edit" />
              Edit
            </button>
          </li>
          <li className="more-menu-item" role="presentation">
            <button
              type="button"
              className="more-menu-btn"
              role="menuitem"
              onMouseDown={handleDelete.bind(this, message)}
            >
            <Icon icon="delete"/>
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default MoreButton;
