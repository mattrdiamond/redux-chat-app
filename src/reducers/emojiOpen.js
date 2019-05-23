import { TOGGLE_EMOJI_PICKER } from "../constants/action-types";

function emojiOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_EMOJI_PICKER:
      return action.payload;
    default:
      return state;
  }
}

export default emojiOpen;
