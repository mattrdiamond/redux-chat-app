import React from "react";
import { connect } from "react-redux";
import "./SidebarInput.css";
import { setFilterValue } from "../actions";

const SidebarInput = ({ filterUsers, handleFilterUsers }) => {
  return (
    <form className="input-container">
      <input
        className="Sidebar__input"
        onChange={handleFilterUsers}
        placeholder="Search contacts"
        value={filterUsers}
      />
    </form>
  );
};

const mapStateToProps = state => {
  const { filterUsers } = state;
  return { filterUsers };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFilterUsers: e => {
      dispatch(setFilterValue(e.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarInput);
