import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import "./App.css";
import { connect } from "react-redux";

const App = ({ user, contacts, activeUserId, filterUsers }) => {
  return (
    <div className="App">
      <Navbar user={user} />
      <Sidebar contacts={Object.values(contacts)} filterUsers={filterUsers} />
      <Main user={user} activeUserId={activeUserId} />
    </div>
  );
};

const mapStateToProps = state => {
  const { user, contacts, activeUserId, filterUsers } = state;
  return {
    user,
    contacts,
    activeUserId,
    filterUsers
  };
};

export default connect(mapStateToProps)(App);
