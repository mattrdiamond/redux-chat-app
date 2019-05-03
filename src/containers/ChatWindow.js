import React from "react";
import Header from "../components/Header";
import Chats from "../components/Chats";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";
import { connect } from "react-redux";

const ChatWindow = ({ activeUserId, contacts, messages, typing, user }) => {
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
      <MessageInput value={typing} />
    </div>
  );
};

const mapStateToProps = state => {
  const { contacts, messages, typing, user } = state;
  return {
    contacts,
    messages,
    typing,
    user
  };
};

export default connect(mapStateToProps)(ChatWindow);
