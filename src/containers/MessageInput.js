import React from "react";
import {
  setInputValue,
  setCursorPosition,
  setEmoji,
  sendMessage
} from "../actions";
import "./MessageInput.css";
import EmojiIcon from "./emoji-picker/EmojiIcon";
import Icon from "../components/Icon";
import { connect } from "react-redux";

const MessageInput = ({
  sendMessage,
  setInputValue,
  setCursorPosition,
  inputValue,
  setEmoji,
  activeUserId
}) => {
  const { typingValue, cursorPosition } = inputValue;

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(typingValue, activeUserId);
  };

  const handleChange = e => {
    const cursor = e.target.selectionStart;
    const typing = e.target.value;
    setInputValue(typing, cursor);
  };

  const handleEmojiClick = emoji => {
    console.log("emoji", emoji);
    setEmoji(emoji);
  };

  const handleCursorChange = e => {
    console.log("event type", e.type);
    switch (e.type) {
      case "keyup":
        if (e.key.includes("Arrow")) {
          setCursorPosition(e.target.selectionStart);
        }
        break;
      case "click":
        if (typingValue.length > 0) {
          setCursorPosition(e.target.selectionStart);
        }
        break;
      default:
        break;
    }
  };

  return (
    <form
      className={"Message" + (typingValue ? " active" : "")}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        className="Message__input"
        onChange={handleChange}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        value={typingValue}
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
  const { inputValue, activeUserId } = state;
  return {
    inputValue,
    activeUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // handleChange: e => {
    //   dispatch(handleChange(e.target.value));
    // },
    setInputValue: (typingValue, cursorPosition) => {
      dispatch(setInputValue(typingValue, cursorPosition));
    },
    setCursorPosition: cursorPosition => {
      dispatch(setCursorPosition(cursorPosition));
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
