import { TOGGLE_SIDEBAR } from "../constants/action-types";

function sidebarOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
}

export default sidebarOpen;
