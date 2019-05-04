import React from "react";
import { setTypingValue, sendMessage } from "../actions";
import "./MessageInput.css";
import sendButton from "../images/send.svg";
import Icon from '../components/Icon';
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
        placeholder="Type your message..."
      />
      <Icon icon="send" width="25px" height="25px"/>
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
