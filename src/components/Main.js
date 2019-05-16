import React from "react";
import "./Main.css";
import Empty from "../components/Empty";
import ChatWindow from "../containers/ChatWindow";

const Main = ({ user, activeUserId, sidebarOpen, toggleSidebar }) => {
  const mobileSidebar = window.innerWidth < 750 && sidebarOpen ? true : false;

  const handleClick = () => {
    if (mobileSidebar) toggleSidebar();
  };

  const renderMainContent = () => {
    if (!activeUserId) {
      return <Empty user={user} activeUserId={activeUserId} />;
    } else {
      return <ChatWindow activeUserId={activeUserId} />;
    }
  };

  return (
    <main
      className={"Main" + (mobileSidebar ? " disabled" : "")}
      onClick={handleClick}
    >
      {renderMainContent()}
    </main>
  );
};

export default Main;
