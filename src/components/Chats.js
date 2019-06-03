import React, { Component } from "react";
import "./Chats.css";
import Chat from "../containers/Chat";
import MoreButton from "../containers/MoreButton";

// const Chat = ({ message, activeUser, user, handleDeleteMsg }) => {
//   const { text, is_user_msg } = message;
//   const containsEmoji = RegExp(
//     /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])*$/g
//   );
//   const checkEmoji =
//     text.length <= 7 && containsEmoji.test(text) ? " big-emoji" : "";
//   const isUserMsg = is_user_msg ? " from-me" : " from-user";
//   const userPhoto = is_user_msg ? user.profile_pic : activeUser.profile_pic;
//   const altText = is_user_msg ? user.name : activeUser.name;

//   const handleClick = deletedMsg => {
//     handleDeleteMsg(deletedMsg);
//   };

//   return (
//     <div className={"Chat-container" + isUserMsg}>
//       <img src={userPhoto} alt={altText} className={"Chat-img" + isUserMsg} />
//       <span className={"Chat" + isUserMsg + checkEmoji}>{text}</span>
//       {is_user_msg && (
//         <React.Fragment>
//           <button
//             className="Chat-close"
//             onClick={handleClick.bind(this, message)}
//           >
//             x
//           </button>
//           <MoreButton />
//         </React.Fragment>
//       )}
//     </div>
//   );
// };

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
            // handleToggleMore={this.props.handleToggleMore}
          />
        ))}
      </div>
    );
  }
}

export default Chats;
