import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
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
            this.setState({ loading: false, user: user.data.user, userId: user.data.userId, isLoggedIn: true, userAuthenticated: true });
		});
	};

	logIn = () => {
		this.setState({ isLoggedIn: true });
	};

	setUser = (props) => {
        console.log(props)
		if (props) {
			this.setState(props);
			return this.setState({loading: false});
		}
        this.setState({ loading: false });
        // return <Redirect to="/"/>
	};

	handleLogOut = () => {
        localStorage.removeItem('_underweather');
		sessionStorage.removeItem('_underweather');
		this.setState({ loading: true, isLoggedIn: false });
		axios.put(`/logout/${this.state.userId}`, { loggedIn: 'logout' }).then((loggedOut) => {
            this.setState({ isLoggedIn: false, user: '', userId: '', loading: false, userAuthenticated: false });
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
					name={this.state.user}
					isLoggedIn={this.state.isLoggedIn}
					handleLogOut={this.handleLogOut}
				/>
                {/* {!this.state.isLoggedIn ?
                    <Loading
                    loading={this.state.loading}
                    setUser={this.setUser}
                    />
                : */}
                    {/* <> */}
                        <Route
                        path='/(form)?/:formtype?'
                        >{this.state.isLoggedIn ? <Redirect to="/dashboard"/> :
                            <FormContainer
                                isLoggedIn={this.state.isLoggedIn}
                                userId={this.state.userId}
                                setUser={this.setUser}
                                user={this.state.user}
                                handleLogIn={this.handleLogIn}
                                error={this.state.error}
                            />
                        }
                        </Route>
                        <Route path="/dashboard">
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
                        </Route>
                    {/* </> */}
                    {/* } */}
			</div>
		);
	}
}

export default withRouter(App);
