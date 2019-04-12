import React, { Component } from 'react';
import _ from 'lodash';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import store from '../store';
import './App.css';

const App = () => {
	const { user, contacts, activeUserId } = store.getState();
	return (
		<div className="App">
			<Sidebar contacts={Object.values(contacts)} />
			<Main user={user} activeUserId={activeUserId} />
		</div>
	);
};

export default App;
