import React, { Component } from "react";
import "./Chats.css";

const Chat = ({ message, activeUser, user }) => {
  const { text, is_user_msg } = message;
  const isUserMsg = is_user_msg ? " is-user-msg" : " not-user-msg";
  const userPhoto = is_user_msg ? user.profile_pic : activeUser.profile_pic;
  const altText = is_user_msg ? user.name : activeUser.name;
  return (
    <div className={"Chat-container" + isUserMsg}>
      <img src={userPhoto} alt={altText} className={"Chat-img" + isUserMsg} />
      <span className={"Chat" + isUserMsg}>{text}</span>
    </div>
  );
};

class Chats extends Component {
  constructor(props) {
    super(props);
    this.chatsRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
  };

  render() {
    return (
      <div className="Chats" ref={this.chatsRef}>
        {this.props.messages.map(message => (
          <Chat
            message={message}
            activeUser={this.props.activeUser}
            user={this.props.user}
            key={message.number}
          />
        ))}
      </div>
    );
  }
}

export default Chats;
