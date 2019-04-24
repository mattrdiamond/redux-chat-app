import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import "./App.css";
import { connect } from "react-redux";

const App = ({ user, contacts, activeUserId }) => {
  return (
    <div className="App">
      <Sidebar contacts={Object.values(contacts)} />
      <Main user={user} activeUserId={activeUserId} />
    </div>
  );
};

const mapStateToProps = state => {
  const { user, contacts, activeUserId } = state;
  return {
    user,
    contacts,
    activeUserId
  };
};

export default connect(mapStateToProps)(App);
