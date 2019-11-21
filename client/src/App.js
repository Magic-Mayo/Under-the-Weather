import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import Demo from './components/Demo/Demo'
import FormContainer from './components/pages/FormContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Loading from './components/icons/loading';
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
	faMinus,
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
    faMinus,
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
        newUser: false,
        error: false
    };

	handleLogIn = (props) => {
		this.setState({ loading: true });
		return axios.post(`/login`, props).then((user) => {
            console.log(user.data)
            if(!user.data){
                return this.setState({error: "Incorrect email/password combination.  Please check to be sure you used the correct email and/or password"})
            }
			if (props.credentials.loginpersist) {
				localStorage.setItem('_underweather', user.data.token);
			} else {
				sessionStorage.setItem('_underweather', user.data.token);
            }
            this.setState({ loading: false, user: user.data.user, userId: user.data.userId, isLoggedIn: true });
		});
	};

	logIn = () => {
		this.setState({ isLoggedIn: true });
	};

	setUser = (props) => {
		if (props) {
			this.setState(props);
			return this.setState({loading: false, isLoggedIn: true});
		}
        this.setState({ loading: false });
	};

	handleLogOut = () => {
        localStorage.removeItem('_underweather');
		sessionStorage.removeItem('_underweather');
		this.setState({ loading: true, isLoggedIn: false });
		axios.put(`/logout/${this.state.userId}`, { loggedIn: 'logout' }).then((loggedOut) => {
            this.setState({ isLoggedIn: false, user: '', userId: '', loading: false });
		});
	};

	toggleForm = (e) => {
		this.setState({
			formOpen: !this.state.formOpen
		});
	};

	render() {



		return (

			<div className={`App${this.props.location.pathname === '/' ? "-demo" : ""}`}>
                <Header
					name={this.state.user}
					isLoggedIn={this.state.isLoggedIn}
					handleLogOut={this.handleLogOut}
                    demo={this.props.location.pathname}
				/>
                {this.state.loading ?
                    <Loading
                    loading={this.state.loading}
                    setUser={this.setUser}
                    />
                :
                    <>
                        <Switch>
                            <Route exact path="/">
                                <Demo demo={true}/>
                            </ Route>
                            <Route path='/:dashOrLogin/(form)?/:formtype?'>
                                <FormContainer
                                    isLoggedIn={this.state.isLoggedIn}
                                    userId={this.state.userId}
                                    setUser={this.setUser}
                                    user={this.state.user}
                                    handleLogIn={this.handleLogIn}
                                    error={this.state.error}
                                />
                            </Route>
                        </Switch>
                        <Route exact path="/dashboard">
                            {!this.state.isLoggedIn ? <Redirect to="/" /> :
                                <Dashboard
                                setUser={this.setUser}
                                user={this.state.user}
                                userId={this.state.userId}
                                menu={this.state.menu}
                                toggleForm={this.toggleForm}
                                formOpen={this.state.formOpen}
                                isLoggedIn={this.state.isLoggedIn}
                                logIn={this.logIn}
                                />
                            }
                        </Route>
                    </>
                    }
			</div>
		);
	}
}

export default withRouter(App);
