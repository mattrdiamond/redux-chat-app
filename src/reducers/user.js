import { generateUser } from '../static-data';

function user(state = generateUser(), action) {
	return state;
}

export default user;
