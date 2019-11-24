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
        error: false,
        redriect: false
    };

	handleLogIn = (props) => {
		this.setState({ loading: true });
		return axios.post(`/login`, props).then((user) => {
            if(!user.data){
                return this.setState({error: "Incorrect email/password combination.  Please check to be sure you used the correct email and/or password"})
            }
			if (!props.credentials.loginpersist) {
				localStorage.setItem('_underweather', user.data.token);
			} else {
				sessionStorage.setItem('_underweather', user.data.token);
            }
            this.setUser({user: user.data.user, userId: user.data.userId});
		});
	};

	logIn = () => {
		this.setState({ isLoggedIn: true });
	};

	setUser = (props) => {
        this.setState({ loading: false });
		if (props) {
			this.setState(props)
            this.setState({isLoggedIn: true});
			this.props.history.push("/dashboard")
		}
	};

	handleLogOut = () => {
        localStorage.removeItem('_underweather');
		sessionStorage.removeItem('_underweather');
		this.setState({ loading: true, isLoggedIn: false });
		axios.put(`/logout/${this.state.userId}`, { loggedIn: 'logout' }).then((loggedOut) => {
            this.setState({ isLoggedIn: false, user: '', userId: '', loading: false });
            this.props.history.push("/login/form")
		});
	};

	toggleForm = (e) => {
		this.setState({
			formOpen: !this.state.formOpen
		});
	};

    redirectToLogin = () => {
        setTimeout(()=> this.setState({redirect: true}), 5000)
    }

	render() {



		return (

			<div className={`App${this.props.location.pathname === '/' ? "-demo" : ""} App`}>
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
                                <Demo
                                demo={true}
                                redirect={this.state.redirect}
                                redirectToLogin={this.redirectToLogin}
                                />
                            </ Route>
                            <Route path="/dashboard" key={this.props.location.pathname}>
                                {!this.state.isLoggedIn ? <Redirect to="/login/form" /> :
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
                        </Switch>
                            <Route exact strict path='/:dashOrLogin/(form)+/:formtype?' key={this.props.location.pathname}>
                                <FormContainer
                                    isLoggedIn={this.state.isLoggedIn}
                                    userId={this.state.userId}
                                    setUser={this.setUser}
                                    user={this.state.user}
                                    handleLogIn={this.handleLogIn}
                                    error={this.state.error}
                                />
                            </Route>
                        
                    </>
                    }
			</div>
		);
	}
}

export default withRouter(App);
