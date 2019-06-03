import { TOGGLE_MORE } from "../constants/action-types";

function moreOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_MORE:
      return action.payload || !state;
    default:
      return state;
  }
}

export default moreOpen;
