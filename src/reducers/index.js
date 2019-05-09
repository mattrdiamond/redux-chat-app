import { combineReducers } from "redux";
import user from "./user";
import contacts from "./contacts";
import activeUserId from "./activeUserId";
import messages from "./messages";
import typing from "./typing";
import filterUsers from "./filterUsers";
// this file will export the combination of all reducers

export default combineReducers({
  user,
  messages,
  contacts,
  activeUserId,
  typing,
  filterUsers
});
