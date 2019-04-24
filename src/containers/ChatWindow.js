import React from "react";
import Header from "../components/Header";
import Chats from "../components/Chats";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";
import { connect } from "react-redux";

const ChatWindow = ({ activeUserId, contacts, messages, typing }) => {
  const activeUser = contacts[activeUserId];
  const activeMsgs = messages[activeUserId];
  return (
    <div className="ChatWindow">
      <Header user={activeUser} />
      <Chats messages={Object.values(activeMsgs)} />
      <MessageInput value={typing} />
    </div>
  );
};

const mapStateToProps = state => {
  const { contacts, messages, typing } = state;
  return {
    contacts,
    messages,
    typing
  };
};

export default connect(mapStateToProps)(ChatWindow);
