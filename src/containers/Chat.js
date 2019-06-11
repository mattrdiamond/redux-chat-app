import React, { Component } from "react";
import "./Chat.css";
import MoreButton from "../components/MoreButton";
import Icon from "../components/Icon";
import { connect } from "react-redux";
import { toggleMore, toggleEditMode, saveEdits } from "../actions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.editChatRef = React.createRef();
    this.handleEditMode = this.handleEditMode.bind(this);
    this.focusContentEditable = this.focusContentEditable.bind(this);
    this.handleSaveEdits = this.handleSaveEdits.bind(this);
    this.toggleMoreBtn = this.toggleMoreBtn.bind(this);
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

  handleSaveEdits() {
    const { activeUserId, saveEdits, message } = this.props;
    const editedContent = this.editChatRef.current.textContent;
    saveEdits(activeUserId, message, editedContent);
  }

  toggleMoreBtn() {
    const { activeUserId, toggleMore, message } = this.props;
    toggleMore(activeUserId, message);
  }

  handleEditMode() {
    const { activeUserId, toggleEditMode, message } = this.props;
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
      handleSaveEdits,
      checkEmoji,
      props: {
        message,
        messages,
        activeUser,
        user,
        handleDeleteMsg,
        activeUserId
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
          <div
            className="editable-wrapper Chat from-me"
            onBlur={handleSaveEdits}
          >
            <div
              className="Chat-editable"
              ref={this.editChatRef}
              contentEditable="true"
              suppressContentEditableWarning={true}
            >
              {text}
            </div>
            <div className="Chat-buttons">
              <button className="Chat-button" onMouseDown={handleEditMode}>
                <Icon icon="cancel" />
              </button>
              <button className="Chat-button" onMouseDown={handleSaveEdits}>
                <Icon icon="save" />
              </button>
            </div>
          </div>
        ) : (
          <span className={"Chat" + isUserMsg + checkEmoji(text)}>{text}</span>
        )}
        {is_user_msg && (
          <MoreButton
            toggleMoreBtn={toggleMoreBtn}
            showMore={message.showMore}
            messages={messages}
            message={message}
            activeUserId={activeUserId}
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
