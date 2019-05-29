import {
  SET_INPUT_VALUE,
  SET_CURSOR_POSITION,
  SET_EMOJI,
  SEND_MESSAGE,
  ACTIVATE_SEND_BUTTON
} from "../constants/action-types";

const initialStateInput = {
  typingValue: "",
  cursorPosition: 0,
  sendButtonActive: false
};

export default function inputValue(state = initialStateInput, action) {
  switch (action.type) {
    case SET_INPUT_VALUE:
      const { typingValue, cursorPosition } = action.payload;
      return {
        ...state,
        typingValue: typingValue,
        cursorPosition: cursorPosition
      };
    case SET_CURSOR_POSITION:
      return {
        ...state,
        cursorPosition: action.payload
      };
    case SET_EMOJI:
      const { emojiString, newCursorPosition } = action.payload;
      return {
        ...state,
        typingValue: emojiString,
        cursorPosition: newCursorPosition
      };
    case SEND_MESSAGE:
      return {
        typingValue: "",
        cursorPosition: 0,
        sendButtonActive: false
      };
    case ACTIVATE_SEND_BUTTON:
      return {
        ...state,
        sendButtonActive: action.payload
      };
    default:
      return state;
  }
}
