import { generateUser } from "../static-data";

const randomUser = Math.floor(Math.random() * 10) + 11;

function user(state = generateUser(randomUser), action) {
  return state;
}

export default user;
