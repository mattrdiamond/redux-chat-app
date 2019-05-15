import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import "./App.css";
import { connect } from "react-redux";

const App = ({ user, contacts, activeUserId, filterUsers, sidebarOpen }) => {
  return (
    <div className="App">
      <Navbar user={user} />
      <Sidebar
        contacts={Object.values(contacts)}
        filterUsers={filterUsers}
        sidebarOpen={sidebarOpen}
      />
      <Main user={user} activeUserId={activeUserId} />
    </div>
  );
};

const mapStateToProps = state => {
  const { user, contacts, activeUserId, filterUsers, sidebarOpen } = state;
  return {
    user,
    contacts,
    activeUserId,
    filterUsers,
    sidebarOpen
  };
};

export default connect(mapStateToProps)(App);
