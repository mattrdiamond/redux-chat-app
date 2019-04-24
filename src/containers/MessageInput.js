import React from "react";
import { setTypingValue, sendMessage } from "../actions";
import "./MessageInput.css";
import { connect } from "react-redux";

const MessageInput = ({
  value,
  sendMessage,
  handleChange,
  typing,
  activeUserId
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(typing, activeUserId);
  };

  return (
    <form className="Message" onSubmit={handleSubmit}>
      <input
        className="Message__input"
        onChange={handleChange}
        value={value}
        placeholder="write a message"
      />
    </form>
  );
};

const mapStateToProps = state => {
  const { typing, activeUserId } = state;
  return {
    typing,
    activeUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      dispatch(setTypingValue(e.target.value));
    },
    sendMessage: (typing, activeUserId) => {
      dispatch(sendMessage(typing, activeUserId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
