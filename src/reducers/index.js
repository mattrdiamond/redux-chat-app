import { combineReducers } from "redux";
import user from "./user";
import contacts from "./contacts";
import activeUserId from "./activeUserId";
import messages from "./messages";
import inputValue from "./inputValue";
import filterUsers from "./filterUsers";
import sidebarOpen from "./sidebarOpen";
import emojiOpen from "./emojiOpen";

export default combineReducers({
  user,
  messages,
  contacts,
  activeUserId,
  inputValue,
  filterUsers,
  sidebarOpen,
  emojiOpen
});
