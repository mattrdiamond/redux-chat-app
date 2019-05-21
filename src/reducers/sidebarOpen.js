import { TOGGLE_SIDEBAR } from "../constants/action-types";

function sidebarOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.payload || !state;
    default:
      return state;
  }
}

export default sidebarOpen;
