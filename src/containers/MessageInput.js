import React from "react";
import { setInputValue, setEmoji, sendMessage } from "../actions";
import "./MessageInput.css";
import EmojiIcon from "./emoji-picker/EmojiIcon";
import Icon from "../components/Icon";
import { connect } from "react-redux";

const MessageInput = ({
  sendMessage,
  setInputValue,
  inputValue,
  setEmoji,
  activeUserId,
}) => {
  const {typingValue, cursorPosition} = inputValue;
  

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(typingValue, activeUserId);
  };

  const handleChange = e => {
    const cursor = e.target.selectionStart;
    const typing = e.target.value;
    setInputValue (typing, cursor);
  }

  const handleEmojiClick = emoji => {
    console.log("emoji", emoji);
    setEmoji(emoji);
  };

  const getCursorPosition = (e) => {
    // console.log('click', e.target.selectionStart);
  }

  return (
    <form
      className={"Message" + (typingValue ? " active" : "")}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        className="Message__input"
        onChange={handleChange}
        onClick={getCursorPosition}
        onKeyUp={getCursorPosition}
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
