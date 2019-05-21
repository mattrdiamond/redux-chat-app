import {
  SET_INPUT_VALUE,
  SET_EMOJI,
  SEND_MESSAGE
} from "../constants/action-types";

const initialStateInput = {
  typingValue: "",
  cursorPosition: 0
}

export default function inputValue(state = initialStateInput, action) {
  switch (action.type) {
    case SET_INPUT_VALUE:
      const {typingValue, cursorPosition} = action.payload;
      return {
        typingValue: typingValue,
        cursorPosition: cursorPosition
      }
    case SET_EMOJI:
      return state + action.payload;
    case SEND_MESSAGE:
      return "";
    default:
      return state;
  }
}
