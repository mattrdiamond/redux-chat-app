// import React from "react";
import React, { Component } from "react";
import {
  setInputValue,
  setCursorPosition,
  setEmoji,
  sendMessage
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
    this.inputField = React.createRef();
  }

  componentDidUpdate() {
    const { cursorPosition } = this.props;

    // restore focus to cursor position after choosing emoji
    if (document.activeElement !== this.inputField.current) {
      this.inputField.current.setSelectionRange(cursorPosition, cursorPosition);
      this.inputField.current.focus();
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
    // new string containing emoji
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

  render() {
    const {
      handleSubmit,
      handleChange,
      handleEmojiClick,
      handleCursorChange,
      props: { typingValue, inputValue, inputField, emojiOpen }
    } = this;
    return (
      <form
        className={"Message" + (typingValue && !emojiOpen ? " active" : "")}
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
          ref={this.inputField}
        />
        <EmojiIcon
          handleEmojiClick={handleEmojiClick}
          inputField={inputField}
          inputValue={inputValue}
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
  const { typingValue, cursorPosition } = inputValue;
  return {
    inputValue,
    activeUserId,
    typingValue,
    cursorPosition,
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);

//--------------------------------------- take two

// const MessageInput = ({
//   sendMessage,
//   setInputValue,
//   setCursorPosition,
//   inputValue,
//   setEmoji,
//   activeUserId
// }) => {
//   const inputField = React.createRef();
//   const { typingValue, cursorPosition } = inputValue;

//   const handleSubmit = e => {
//     e.preventDefault();
//     sendMessage(typingValue, activeUserId);
//   };

//   const handleChange = e => {
//     const cursor = e.target.selectionStart;
//     const typing = e.target.value;
//     setInputValue(typing, cursor);
//   };

//   const handleEmojiClick = emoji => {
//     // new string containing emoji
//     const emojiString =
//       typingValue.substring(0, cursorPosition) +
//       emoji +
//       typingValue.substring(cursorPosition);
//     const newCursorPosition = cursorPosition + 2;
//     setEmoji(emojiString, newCursorPosition);
//   };

//   const handleCursorChange = e => {
//     switch (e.type) {
//       case "keyup":
//         if (e.key.includes("Arrow")) {
//           setCursorPosition(e.target.selectionStart);
//         }
//         break;
//       case "click":
//         const clickedPosition = e.target.selectionStart;
//         if (typingValue.length > 0 && cursorPosition !== clickedPosition) {
//           setCursorPosition(clickedPosition);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const test = () => {
//     console.log(inputField.current);
//     inputField.current.focus();
//   };

//   return (
//     <form
//       className={"Message" + (typingValue ? " active" : "")}
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <input
//         className="Message__input"
//         onChange={handleChange}
//         onClick={handleCursorChange}
//         onKeyUp={handleCursorChange}
//         value={typingValue}
//         placeholder="Type your message..."
//         ref={inputField}
//       />
//       <button onClick={test}>test</button>
//       <EmojiIcon
//         handleEmojiClick={handleEmojiClick}
//         inputField={inputField}
//         inputValue={inputValue}
//       />
//       <button className="send-button">
//         <Icon icon="send" width="25px" height="25px" title="send" />
//       </button>
//     </form>
//   );
// };

// const mapStateToProps = state => {
//   const { inputValue, activeUserId } = state;
//   return {
//     inputValue,
//     activeUserId
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setInputValue: (typingValue, cursorPosition) => {
//       dispatch(setInputValue(typingValue, cursorPosition));
//     },
//     setCursorPosition: cursorPosition => {
//       dispatch(setCursorPosition(cursorPosition));
//     },
//     sendMessage: (typing, activeUserId) => {
//       dispatch(sendMessage(typing, activeUserId));
//     },
//     setEmoji: (emojiString, newCursorPosition) => {
//       dispatch(setEmoji(emojiString, newCursorPosition));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MessageInput);
