import React from "react";
import "./MoreButton.css";
import Icon from "./Icon";

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
  );
};

export default MoreButton;
