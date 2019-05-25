import React, { Component } from "react";
import Icon from "../components/Icon";
import "./EmojiIcon.css";
import { toggleEmojiPicker } from "../actions";
import EmojiPicker from "../components/EmojiPicker";
import { connect } from "react-redux";

const EmojiIcon = ({
  emojiOpen,
  toggleEmojiPicker,
  handleEmojiClick,
  inputField,
  inputValue
}) => {
  const _handlePickerBlur = () => {
    toggleEmojiPicker(false);
  };

  const _openPicker = e => {
    e.preventDefault();
    toggleEmojiPicker(!emojiOpen);
    // inputField.current.focus();
    // console.log("input", inputField.current);
  };

  return (
    <div className="emoji-button-wrapper">
      {emojiOpen && (
        <EmojiPicker
          onBlur={_handlePickerBlur.bind(this)}
          handleEmojiClick={handleEmojiClick}
          inputValue={inputValue}
          inputField={inputField}
        />
      )}
      <button onClick={_openPicker.bind(this)} className="emoji-button">
        <Icon
          icon="smile"
          title="add emoji"
          height="25px"
          width="25px"
          className={`sc-user-input--emoji-icon ${emojiOpen ? "active" : ""}`}
        />
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  const { emojiOpen } = state;
  return {
    emojiOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEmojiPicker: boolean => {
      dispatch(toggleEmojiPicker(boolean));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiIcon);

// class EmojiIcon extends Component {
//   _handlePickerBlur() {
//     this.props.toggleEmojiPicker(false);
//   }

//   _openPicker(e) {
//     e.preventDefault();
//     this.props.toggleEmojiPicker(!this.props.emojiOpen);
//   }

//   render() {
//     return (
//       <div className="emoji-button-wrapper">
//         {this.props.emojiOpen && (
//           <EmojiPicker
//             onBlur={this._handlePickerBlur.bind(this)}
//             handleEmojiClick={this.props.handleEmojiClick}
//           />
//         )}
//         <button onClick={this._openPicker.bind(this)} className="emoji-button">
//           <Icon
//             icon="smile"
//             title="add emoji"
//             height="25px"
//             width="25px"
//             className={`sc-user-input--emoji-icon ${
//               this.props.emojiOpen ? "active" : ""
//             }`}
//           />
//         </button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   const { emojiOpen } = state;
//   return {
//     emojiOpen
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleEmojiPicker: boolean => {
//       dispatch(toggleEmojiPicker(boolean));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EmojiIcon);
