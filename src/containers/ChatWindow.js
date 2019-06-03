import React from "react";
import Header from "../components/Header";
import Chats from "../components/Chats";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";
import { connect } from "react-redux";
import { deleteMessage } from "../actions";
import _ from "lodash";

const ChatWindow = ({
  activeUserId,
  contacts,
  messages,
  inputValue,
  user,
  deleteMessage
}) => {
  const activeUser = contacts[activeUserId];
  const activeMsgs = messages[activeUserId];
  const handleDeleteMsg = deletedMsg => {
    deleteMessage(activeMsgs, deletedMsg, activeUser);
    console.log("DELETE!!!");
  };

  // const handleToggleMore = () => {
  //   console.log("toggle!!!");
  // };

  return (
    <div className="ChatWindow">
      <Header activeUser={activeUser} />
      <Chats
        messages={Object.values(activeMsgs)}
        activeUser={activeUser}
        user={user}
        handleDeleteMsg={handleDeleteMsg}
        // handleToggleMore={handleToggleMore}
      />
      <MessageInput inputValue={inputValue} />
    </div>
  );
};

const mapStateToProps = state => {
  const { contacts, messages, inputValue, user } = state;
  return {
    contacts,
    messages,
    inputValue,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: (activeMsgs, deletedMsg, activeUser) => {
      dispatch(deleteMessage(activeMsgs, deletedMsg, activeUser));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindow);
