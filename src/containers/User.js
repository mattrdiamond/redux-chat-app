import React from "react";
import { setActiveUserId } from "../actions";
import "./User.css";
import { connect } from "react-redux";

const User = ({ user, handleUserClick, activeUserId, sidebarOpen }) => {
  const { name, profile_pic, status, user_id } = user;

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleUserClick(user_id);
    }
  };

  const isSidebarOpen = sidebarOpen ? " visible" : " hidden";

  return (
    <div
      className={
        "User" + (user_id === activeUserId ? " active" : "") + isSidebarOpen
      }
      onClick={handleUserClick.bind(null, user_id)}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <img src={profile_pic} alt={name} className="User__pic" />
      <div className="User__details">
        <p className="User__details-name">{name}</p>
        <p className="User__details-status">{status}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { activeUserId, sidebarOpen } = state;
  return {
    activeUserId: activeUserId,
    sidebarOpen: sidebarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserClick: user_id => {
      dispatch(setActiveUserId(user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

// const User = ({ user, handleUserClick }) => {
//   const { name, profile_pic, status, user_id } = user;
//   return (
//     <div className="User" onClick={handleUserClick.bind(null, user_id)}>
//       <img src={profile_pic} alt={name} className="User__pic" />
//       <div className="User__details">
//         <p className="User details-name">{name}</p>
//         <p className="User__details-status">{status}</p>
//       </div>
//     </div>
//   );
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     handleUserClick: user_id => {
//       dispatch(setActiveUserId(user_id));
//     }
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(User);
