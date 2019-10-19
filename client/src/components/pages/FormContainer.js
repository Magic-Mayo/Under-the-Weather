import React, { Component } from 'react';
import EntranceForm from '../forms/EntranceForm'
import Loading from '../icons/loading';

export default class FormContainer extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0,
		showPassword: false
	};
	setLogIn = () => {
		this.setState({
			loginActive: true,
			signupActive: false,
			showPassword: false
		});
	};

	setSignUp = () => {
		this.setState({
			signupActive: true,
			loginActive: false,
			showPassword: false
		});
	};

	togglePassword = () => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	render() {
		return !this.props.isLoading ? (
			<div className="FormContainer">
				<section
					className={`form-container card ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}
				>
					{!this.props.isLoggedIn &&
						<div className="form-btn-wrapper">
							<button className="form-btn form-btn-signup" onClick={this.setSignUp}>
								Sign Up
							</button>
							<button className="form-btn form-btn-login" onClick={this.setLogIn}>
								Log In
							</button>
						</div>
					}

					{this.props.isLoggedIn ? (
						''
					) : (
						<EntranceForm
							handleLogIn={this.props.handleLogIn}
							state={this.state}
							message={this.props.message}
							togglePassword={this.togglePassword}
							setSignUp={this.setSignUp}
							setLogIn={this.setLogIn}
						/>
					)}
				</section>
			</div>
		) : (
			<Loading loading={this.props.isLoading} />
		);
	}
}
