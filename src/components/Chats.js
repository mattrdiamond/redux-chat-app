import React, { Component } from "react";
import "./Chats.css";
import Chat from "../containers/Chat";
// import { state } from "../static-data";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.chatsRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevState) {
    if (prevState.messages.length < this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
  }

  render() {
    return (
      <div className="Chats" ref={this.chatsRef}>
        {this.props.messages.map(message => (
          <Chat
            message={message}
            activeUser={this.props.activeUser}
            user={this.props.user}
            key={message.number}
            handleDeleteMsg={this.props.handleDeleteMsg}
          />
        ))}
      </div>
    );
  }
}

export default Chats;
