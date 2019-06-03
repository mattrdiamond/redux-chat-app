import { getMessages } from "../static-data";
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  TOGGLE_MORE
} from "../constants/action-types";
import _ from "lodash";

export default function messages(state = getMessages(10), action) {
  switch (action.type) {
    case SEND_MESSAGE:
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
            showMore: false
          }
        }
      };
    case DELETE_MESSAGE:
      const { activeMsgs, deletedMsg, activeUser } = action.payload;
      const remainingMsgs = _.omit(activeMsgs, deletedMsg.number);
      const { user_id } = activeUser;
      return {
        ...state,
        [user_id]: remainingMsgs
      };
    case TOGGLE_MORE:
      const { activeUserId, activeMsg } = action.payload;
      const userMsgs = state[activeUserId];
      const { number } = activeMsg;
      const { showMore } = activeMsg;

      return {
        ...state,
        [activeUserId]: {
          ...userMsgs,
          [number]: {
            ...activeMsg,
            showMore: !showMore
          }
        }
      };

    default:
      return state;
  }
}
