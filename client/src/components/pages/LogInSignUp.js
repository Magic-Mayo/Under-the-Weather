import React, { Component } from 'react'
import EntranceForm from '../forms/EntranceForm'
import Loading from '../icons/loading'

export default class LogInSignUp extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0
	}
	setLogIn = () => {
		this.setState({
			loginActive: true,
			signupActive: false
		})
	}

	setSignUp = () => {
		this.setState({
			signupActive: true,
			loginActive: false
		})
	}

	render() {
		return (
            !this.props.isLoading ?
			<div className="LogInSignUp">
				<section
					className={`login-form-container card ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}
				>
					<div className="login-form-btn-wrapper">
						<button className="login-form-btn login-form-btn-signup" onClick={this.setSignUp}>
							Sign Up
						</button>
						<button className="login-form-btn login-form-btn-login" onClick={this.setLogIn}>
							Log In
						</button>
					</div>
					<EntranceForm handleLogIn={this.props.handleLogIn} loginActive={this.state.loginActive} page={this.state.currentPage} />
				</section>
            </div>:
            <Loading loading={this.props.isLoading}/>
		);
	}
}
