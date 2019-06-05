import { getMessages } from "../static-data";
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  TOGGLE_MORE,
  TOGGLE_EDIT_MODE,
  SAVE_EDITS
} from "../constants/action-types";
import _ from "lodash";

export default function messages(state = getMessages(10), action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      const { message, userId } = action.payload;
      const allUserMsgs = state[userId];
      // 1. convert object to array of keys, 2. retrieve last item, 3. add 1 to make it last key
      const msgNumber = +_.keys(allUserMsgs).pop() + 1;
      return {
        ...state,
        [userId]: {
          ...allUserMsgs,
          [msgNumber]: {
            number: msgNumber,
            text: message,
            is_user_msg: true,
            showMore: false,
            editMode: false
          }
        }
      };
    }
    case DELETE_MESSAGE: {
      const { message, userId } = action.payload;
      const allUserMsgs = state[userId];
      const remainingMsgs = _.omit(allUserMsgs, message.number);
      return {
        ...state,
        [userId]: remainingMsgs
      };
    }
    case TOGGLE_MORE: {
      const { userId, message } = action.payload;
      const { number, showMore } = message;
      const allUserMsgs = state[userId];
      return {
        ...state,
        [userId]: {
          ...allUserMsgs,
          [number]: {
            ...message,
            showMore: !showMore
          }
        }
      };
    }
    case TOGGLE_EDIT_MODE: {
      const { userId, message } = action.payload;
      const { number, editMode } = message;
      const allUserMsgs = state[userId];
      return {
        ...state,
        [userId]: {
          ...allUserMsgs,
          [number]: {
            ...message,
            editMode: !editMode
          }
        }
      };
    }
    case SAVE_EDITS: {
      const { userId, message, editedContent } = action.payload;
      const { number } = message;
      const allUserMsgs = state[userId];
      return {
        ...state,
        [userId]: {
          ...allUserMsgs,
          [number]: {
            ...message,
            text: editedContent,
            editMode: false
          }
        }
      };
    }
    default:
      return state;
  }
}
