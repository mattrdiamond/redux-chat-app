import React from "react";
import { setTypingValue, setEmoji, sendMessage } from "../actions";
import "./MessageInput.css";
import EmojiIcon from "./emoji-picker/EmojiIcon";
import Icon from "../components/Icon";
import { connect } from "react-redux";

const MessageInput = ({
  value,
  sendMessage,
  handleChange,
  typing,
  setEmoji,
  activeUserId
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(typing, activeUserId);
  };

  const handleEmojiClick = emoji => {
    console.log("emoji", emoji);
    setEmoji(emoji);
  };

  return (
    <form
      className={"Message" + (typing.length ? " active" : "")}
      onSubmit={handleSubmit}
    >
      <input
        className="Message__input"
        onChange={handleChange}
        value={value}
        placeholder="Type your message..."
      />
      <button className="send-button">
        <Icon icon="send" width="25px" height="25px" title="send" />
      </button>
      <EmojiIcon handleEmojiClick={handleEmojiClick} />
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
    },
    setEmoji: emoji => {
      dispatch(setEmoji(emoji));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
