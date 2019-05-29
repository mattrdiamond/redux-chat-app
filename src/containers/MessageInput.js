import React, { Component } from "react";
import {
  setInputValue,
  setCursorPosition,
  setEmoji,
  sendMessage,
  activateSendButton
} from "../actions";
import "./MessageInput.css";
import EmojiIcon from "./EmojiIcon";
import Icon from "../components/Icon";
import { connect } from "react-redux";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCursorChange = this.handleCursorChange.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.inputField = React.createRef();
  }

  componentDidUpdate() {
    this.isSendButtonActive();
  }

  isSendButtonActive() {
    const {
      inputField,
      props: { inputValue, sendButtonActive, activateSendButton }
    } = this;
    if (
      inputValue.typingValue.length > 0 &&
      inputField.current === document.activeElement &&
      sendButtonActive === false
    ) {
      activateSendButton(true);
    } else if (
      inputField.current !== document.activeElement &&
      sendButtonActive === true
    ) {
      activateSendButton(false);
    }
  }

  handleSubmit(e) {
    const { typingValue, activeUserId, sendMessage } = this.props;
    e.preventDefault();
    sendMessage(typingValue, activeUserId);
  }

  handleChange(e) {
    const { setInputValue } = this.props;
    const cursor = e.target.selectionStart;
    const typing = e.target.value;
    setInputValue(typing, cursor);
  }

  handleEmojiClick(emoji) {
    const { typingValue, cursorPosition, setEmoji } = this.props;
    const emojiString =
      typingValue.substring(0, cursorPosition) +
      emoji +
      typingValue.substring(cursorPosition);
    const newCursorPosition = cursorPosition + 2;
    setEmoji(emojiString, newCursorPosition);
  }

  handleCursorChange(e) {
    const { typingValue, cursorPosition, setCursorPosition } = this.props;
    switch (e.type) {
      case "keyup":
        if (e.key.includes("Arrow")) {
          setCursorPosition(e.target.selectionStart);
        }
        break;
      case "click":
        const clickedPosition = e.target.selectionStart;
        if (typingValue.length > 0 && cursorPosition !== clickedPosition) {
          setCursorPosition(clickedPosition);
        }
        break;
      default:
        break;
    }
  }

  handleBlur() {
    this.props.activateSendButton(false);
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      handleEmojiClick,
      handleCursorChange,
      handleBlur,
      props: { typingValue, inputValue, cursorPosition }
    } = this;

    return (
      <form
        className={"Message" + (this.props.sendButtonActive ? " active" : "")}
        autoComplete="off"
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <input
          className="Message__input"
          onChange={handleChange}
          onClick={handleCursorChange}
          onKeyUp={handleCursorChange}
          value={typingValue}
          placeholder="Type your message..."
          ref={this.inputField}
        />
        <EmojiIcon
          handleEmojiClick={handleEmojiClick}
          inputField={this.inputField}
          inputValue={inputValue}
          cursorPosition={cursorPosition}
        />
        <button className="send-button">
          <Icon icon="send" width="25px" height="25px" title="send" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { inputValue, activeUserId, emojiOpen } = state;
  const { typingValue, cursorPosition, sendButtonActive } = inputValue;
  return {
    inputValue,
    activeUserId,
    typingValue,
    cursorPosition,
    sendButtonActive,
    emojiOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInputValue: (typingValue, cursorPosition) => {
      dispatch(setInputValue(typingValue, cursorPosition));
    },
    setCursorPosition: cursorPosition => {
      dispatch(setCursorPosition(cursorPosition));
    },
    sendMessage: (typing, activeUserId) => {
      dispatch(sendMessage(typing, activeUserId));
    },
    setEmoji: (emojiString, newCursorPosition) => {
      dispatch(setEmoji(emojiString, newCursorPosition));
    },
    activateSendButton: value => {
      dispatch(activateSendButton(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
