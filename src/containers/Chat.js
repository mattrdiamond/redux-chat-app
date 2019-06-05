import React, { Component } from "react";
import "./Chat.css";
import MoreButton from "./MoreButton";
import { connect } from "react-redux";
import { toggleMore, toggleEditMode, saveEdits } from "../actions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.editChatRef = React.createRef();
    this.handleEditMode = this.handleEditMode.bind(this);
    this.focusContentEditable = this.focusContentEditable.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.message.editMode === false &&
      this.props.message.editMode === true
    ) {
      this.focusContentEditable();
    }
  }

  focusContentEditable = () => {
    setTimeout(() => {
      this.editChatRef.current.focus();
    }, 0);
  };

  handleBlur(message) {
    const { activeUserId, saveEdits } = this.props;
    const editedContent = this.editChatRef.current.textContent;
    saveEdits(activeUserId, message, editedContent);
  }

  toggleMoreBtn(message) {
    const { activeUserId, toggleMore } = this.props;
    toggleMore(activeUserId, message);
  }

  handleEditMode(message) {
    const { activeUserId, toggleEditMode } = this.props;
    toggleEditMode(activeUserId, message);
  }

  checkEmoji(text) {
    const containsEmoji = RegExp(
      /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])*$/g
    );
    if (text.length <= 7 && containsEmoji.test(text)) {
      return " big-emoji";
    }
    return "";
  }

  render() {
    const {
      toggleMoreBtn,
      handleEditMode,
      props: {
        message,
        activeUser,
        activeUserId,
        user,
        handleDeleteMsg,
        toggleMore,
        toggleEditMode
      }
    } = this;
    const { text, is_user_msg, editMode } = message;
    const isUserMsg = is_user_msg ? " from-me" : " from-user";
    const userPhoto = is_user_msg ? user.profile_pic : activeUser.profile_pic;
    const altText = is_user_msg ? user.name : activeUser.name;

    return (
      <div className={"Chat-container" + isUserMsg}>
        <img src={userPhoto} alt={altText} className={"Chat-img" + isUserMsg} />
        {editMode ? (
          // <input type="text" defaultValue={text} />
          <div
            className="Chat from-me edit"
            ref={this.editChatRef}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={this.handleBlur.bind(this, message)}
          >
            {text}
            {/*<div className="edit-buttons">
              <button className="cancel-button">Cancel</button>
              <button className="save-button">Save</button>
        </div>*/}
          </div>
        ) : (
          <span className={"Chat" + isUserMsg + this.checkEmoji(text)}>
            {text}
          </span>
        )}
        {is_user_msg && (
          <MoreButton
            toggleMoreBtn={toggleMoreBtn.bind(this, message)}
            showMore={message.showMore}
            message={message}
            handleDeleteMsg={handleDeleteMsg}
            handleEditMode={handleEditMode}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { messages, activeUserId } = state;
  return {
    messages,
    activeUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMore: (userId, message) => {
      dispatch(toggleMore(userId, message));
    },
    toggleEditMode: (userId, message) => {
      dispatch(toggleEditMode(userId, message));
    },
    saveEdits: (userId, message, editedContent) => {
      dispatch(saveEdits(userId, message, editedContent));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

// ----------------------------------------------------

// const Chat = ({
//   message,
//   activeUser,
//   user,
//   handleDeleteMsg,
//   activeUserId,
//   messages,
//   toggleMore,
//   toggleEditMode
// }) => {
//   const { text, is_user_msg, editMode } = message;
//   const containsEmoji = RegExp(
//     /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])*$/g
//   );
//   const checkEmoji =
//     text.length <= 7 && containsEmoji.test(text) ? " big-emoji" : "";
//   const isUserMsg = is_user_msg ? " from-me" : " from-user";
//   const userPhoto = is_user_msg ? user.profile_pic : activeUser.profile_pic;
//   const altText = is_user_msg ? user.name : activeUser.name;

//   const toggleMoreBtn = message => {
//     toggleMore(activeUserId, message);
//   };

//   const handleEditMode = message => {
//     toggleEditMode(activeUserId, message);
//   };

//   return (
//     <div className={"Chat-container" + isUserMsg}>
//       <img src={userPhoto} alt={altText} className={"Chat-img" + isUserMsg} />
//       {editMode ? (
//         // <input type="text" defaultValue={text} />
//         <div className={"Chat" + isUserMsg} contentEditable="true">
//           {text}
//         </div>
//       ) : (
//         <span className={"Chat" + isUserMsg + checkEmoji}>{text}</span>
//       )}
//       {is_user_msg && (
//         <MoreButton
//           toggleMoreBtn={toggleMoreBtn.bind(this, message)}
//           showMore={message.showMore}
//           message={message}
//           handleDeleteMsg={handleDeleteMsg}
//           handleEditMode={handleEditMode}
//         />
//       )}
//     </div>
//   );
// };

// const mapStateToProps = state => {
//   const { messages, activeUserId } = state;
//   return {
//     messages,
//     activeUserId
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleMore: (userId, message) => {
//       dispatch(toggleMore(userId, message));
//     },
//     toggleEditMode: (userId, message) => {
//       dispatch(toggleEditMode(userId, message));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Chat);
