import React from "react";
import { setActiveUserId } from "../actions";
import "./User.css";
import { connect } from "react-redux";

const User = ({ user, handleUserClick, activeUserId }) => {
  const { name, profile_pic, status, user_id } = user;
  console.log("active id", activeUserId);
  return (
    <div
      className={"User" + (user_id === activeUserId ? " active" : "")}
      onClick={handleUserClick.bind(null, user_id)}
    >
      <img src={profile_pic} alt={name} className="User__pic" />
      <div className="User__details">
        <p className="User details-name">{name}</p>
        <p className="User__details-status">{status}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { activeUserId } = state;
  return {
    activeUserId: activeUserId
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
