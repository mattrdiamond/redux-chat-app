import { SET_FILTER_VALUE } from "../constants/action-types";

export default function filterUsers(state = "", action) {
  switch (action.type) {
    case SET_FILTER_VALUE:
      return action.payload;
    default:
      return state;
  }
}
