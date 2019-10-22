import React, { Component } from 'react'
import EntranceForm from '../forms/EntranceForm'
import Loading from '../icons/loading'

export default class FormContainer extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0,
		showPassword: false
	}
	setLogIn = () => {
		this.setState({
			loginActive: true,
			signupActive: false,
			showPassword: false
		})
	}

	setSignUp = () => {
		this.setState({
			signupActive: true,
			loginActive: false,
			showPassword: false
		})
	}

	togglePassword = () => {
        this.setState(
            {
                showPassword: !this.state.showPassword
            }
        )
    }

	render() {
		return (
            !this.props.loading ?
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
					<EntranceForm loginActive={this.state.loginActive} page={this.state.currentPage} message={this.props.message} togglePassword=
					{this.togglePassword} showPassword={this.state.showPassword} handleLogIn={this.props.handleLogIn}/>
				</section>
            </div>
            :<Loading loading={this.props.isLoading}/>
		);
	}
}
