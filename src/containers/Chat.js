import React from "react";
import "./Chat.css";
import MoreButton from "./MoreButton";
import { connect } from "react-redux";
import { toggleMore } from "../actions";

const Chat = ({
  message,
  activeUser,
  user,
  handleDeleteMsg,
  activeUserId,
  messages,
  toggleMore
}) => {
  const { text, is_user_msg } = message;
  const containsEmoji = RegExp(
    /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])*$/g
  );
  const checkEmoji =
    text.length <= 7 && containsEmoji.test(text) ? " big-emoji" : "";
  const isUserMsg = is_user_msg ? " from-me" : " from-user";
  const userPhoto = is_user_msg ? user.profile_pic : activeUser.profile_pic;
  const altText = is_user_msg ? user.name : activeUser.name;

  const handleDelete = deletedMsg => {
    handleDeleteMsg(deletedMsg);
  };

  const toggleMoreBtn = activeMsg => {
    toggleMore(activeUserId, activeMsg);
  };

  return (
    <div className={"Chat-container" + isUserMsg}>
      <img src={userPhoto} alt={altText} className={"Chat-img" + isUserMsg} />
      <span className={"Chat" + isUserMsg + checkEmoji}>{text}</span>
      {is_user_msg && (
        <React.Fragment>
          <button
            className="Chat-close"
            onClick={handleDelete.bind(this, message)}
          >
            x
          </button>
          <MoreButton
            toggleMoreBtn={toggleMoreBtn.bind(this, message)}
            showMore={message.showMore}
            message={message}
            handleDeleteMsg={handleDeleteMsg}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { messages, activeUserId } = state;
  return {
    messages,
    activeUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMore: (activeUserId, activeMsg) => {
      dispatch(toggleMore(activeUserId, activeMsg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
