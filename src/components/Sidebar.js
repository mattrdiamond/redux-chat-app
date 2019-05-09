import React from "react";
import User from "../containers/User";
import "./Sidebar.css";
import SidebarInput from "../containers/SidebarInput";

const Sidebar = ({ contacts, filterUsers }) => {
  const visibleUsers = contacts.filter(contact =>
    contact.name
      .toLowerCase()
      .replace(/[^\w ]/gi, "")
      .trim()
      .includes(
        filterUsers
          .toLowerCase()
          .replace(/[^\w ]/gi, "")
          .trim()
      )
  );
  return (
    <aside className="Sidebar">
      <SidebarInput />
      {visibleUsers.map(contact => (
        <User user={contact} key={contact.user_id} />
      ))}
    </aside>
  );
};

export default Sidebar;
