import { getMessages } from "../static-data";
import { SEND_MESSAGE } from "../constants/action-types";
import _ from "lodash";

export default function messages(state = getMessages(10), action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const { message, userId } = action.payload;
      const allUserMsgs = state[userId];
      // 1. convert object to array of keys, 2. retrieve last item, 3. add 1 to make it last key
      const number = +_.keys(allUserMsgs).pop() + 1;
      console.log('number', number);

      return {
        ...state,
        [userId]: {
          ...allUserMsgs,
          [number]: {
            number,
            text: message,
            is_user_msg: true
          }
        }
      };
    default:
      return state;
  }
}
