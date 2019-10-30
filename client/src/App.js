import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import FormContainer from './components/pages/FormContainer';
import Loading from './components/icons/loading';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
	faAngleDown,
	faPlus,
	faEnvelope,
	faPhone,
	faFilter,
	faSortDown,
	//   faChild,
	faEye,
	faEyeSlash,
	faPen,
	faMinusCircle,
    faEdit,
    faAngleDoubleDown,
    faAngleDoubleUp
} from '@fortawesome/free-solid-svg-icons';
import bodyParts from './data/bodyParts.json';
import './App.scss';
import axios from 'axios';

library.add(
    faAngleDown,
    faPlus,
    faEnvelope,
    faPhone,
    faFilter,
    faSortDown,
    faEye,
    faEyeSlash,
    faPen,
    fab,
    faEdit,
    faMinusCircle,
    faAngleDoubleDown,
    faAngleDoubleUp);

class App extends Component {
	state = {
		bodyParts,

		menu: {
			isExpanded: false
		},
		isLoggedIn: false,
		loading: true,
		formOpen: false,
		user: false
	};

	handleLogIn = (props) => {
		this.setState({ loading: true });
		return axios.post(`/login`, props).then((user) => {
			if (props.credentials.loginpersist) {
				localStorage.setItem('_underweather', user.data.token);
			} else {
				sessionStorage.setItem('_underweather', user.data.token);
			}
			console.log(user);
			this.setState({ loading: false, user: user.data.user, userId: user.data.userId, isLoggedIn: true });
			window.history.pushState(null, '', '/dashboard');
		});
	};

	logIn = () => {
		this.setState({ isLoggedIn: true });
	};

	setUser = (props) => {
		if (props) {
			this.setState(props);
			return this.setState({ isLoggedIn: true, loading: false });
		}
		this.setState({ loading: false });
	};

	handleLogOut = () => {
		this.setState({ loading: true });
		localStorage.removeItem('_underweather');
		sessionStorage.removeItem('_underweather');
		axios.put(`/logout/${this.state.userId}`, { loggedIn: 'logout' }).then((loggedOut) => {
			this.setState({ isLoggedIn: false, user: '', userId: '', loading: false });
			window.history.pushState(null, '', '/');
		});
	};

	toggleForm = (e) => {
		this.setState({
			formOpen: !this.state.formOpen
		});
	};

	render() {
		return (
			<div className="App">
				<Header
					name={this.state.user.name}
					isLoggedIn={this.state.isLoggedIn}
					handleLogOut={this.handleLogOut}
				/>
				{this.state.loading ? (
					<Loading loading={this.state.loading} setUser={this.setUser} />
				) : !this.state.isLoggedIn && !this.state.user ? (
					<FormContainer
						setUser={this.setUser}
						loading={this.state.loading}
						handleLogIn={this.handleLogIn}
						isLoading={this.isLoading}
						isLoggedIn={this.state.isLoggedIn}
					/>
				) : (
					<Router>
						<Route
							path="/dashboard"
						/>
                            <Dashboard
                                setUser={this.setUser}
                                user={this.state.user}
                                userId={this.state.userId}
                                menu={this.state.menu}
                                toggleForm={this.toggleForm}
                                formOpen={this.state.formOpen}
                                isLoggedIn={this.state.isLoggedIn}
                            />
					</Router>
				)}
			</div>
		);
	}
}

export default App;
