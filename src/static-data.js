const shortid = require('shortid');
const txtgen = require('txtgen');
const faker = require('faker');
const _ = require('lodash');

const users = generateUsers(10); // array of objects
export const contacts = _.mapKeys(users, 'user_id');
export const getMessages = (messagesPerUser) => {
	let messages = {};
	_.forEach(users, (user) => {
		messages[user.user_id] = {
			..._.mapKeys(generateMsgs(messagesPerUser), 'number')
		};
	});
	return messages;
};

// example of how the state object is structured
export const state = {
	user: generateUser(),
	messages: getMessages(10),
	typing: '',
	contacts,
	activeUserId: null
};

/**
 * @returns {Object} - a new user object
 */

export function generateMsg(number) {
	return {
		number,
		text: txtgen.sentence(),
		is_user_msg: faker.random.boolean()
	};
}

/**
 * @returns {Object} - a new user object
 */

export function generateUser() {
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		profile_pic: faker.internet.avatar(),
		status: txtgen.sentence(),
		user_id: shortid.generate()
	};
}

/**
  * @param {Number} numberOfUsers
  * @param {Function} generateUser
  * @returns {Array} - an array of user objects with length n
  */

function generateUsers(numberOfUsers) {
	return Array.from({ length: numberOfUsers }, () => generateUser());
}

function generateMsgs(numberOfMsgs) {
	return Array.from({ length: numberOfMsgs }, (v, i) => generateMsg(i));
}
