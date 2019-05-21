import React from "react";
import Header from "../components/Header";
import Chats from "../components/Chats";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";
import { connect } from "react-redux";

const ChatWindow = ({ activeUserId, contacts, messages, inputValue, user }) => {
  const activeUser = contacts[activeUserId];
  const activeMsgs = messages[activeUserId];
  return (
    <div className="ChatWindow">
      <Header activeUser={activeUser} />
      <Chats
        messages={Object.values(activeMsgs)}
        activeUser={activeUser}
        user={user}
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

export default connect(mapStateToProps)(ChatWindow);
