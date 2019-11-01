import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { withRouter } from 'react-router';

class EntranceForm extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0,
        showPassword: false
    };


    togglePassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    toggleSignUporLogIn = () => {
        return this.setState({
            loginActive: !this.state.loginActive, 
            signupActive: !this.state.signupActive
        })
	};

	render() {                
		return (
            <section className={`form-container ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}>
			<div className={`form form-${this.state.loginActive ? 'existing' : 'new'}`}>
                <div className="form-btn-wrapper">
                    <button
                    disabled={this.state.signupActive}
                    className={`form-btn form-btn-signup ${this.state.signupActive && 'disabled'}`}
                    onClick={this.toggleSignUporLogIn}
                    >
                        Sign Up
                    </button>
                    <button
                    disabled={this.state.loginActive}
                    className={`form-btn form-btn-login ${this.state.loginActive && 'disabled'}`}
                    onClick={this.toggleSignUporLogIn}
                    >
                        Log In
                    </button>
                </div>

				{
					this.props.message && <p>{this.props.message}</p>
				}
				{this.state.signupActive ? (
					<SignupForm
						setUser={this.props.setUser} 
						classNames={`form-input-box form-${!this.state.loginActive ? 'existing' : 'new'}-input-box`}
						togglePassword={this.props.togglePassword}
                        showPassword={this.state.showPassword}
                        logInNewUser={this.props.logInNewUser}
                        loginType = 'new'
                        headingText = 'Sign Up For a Free Account'
                        setUser={this.props.setUser}
                        userId={this.props.userId}
					/>
				) : (
					<LoginForm
						setUser={this.props.setUser} 
						handleLogIn={this.props.handleLogIn}
						classNames={`form-input-box form-${this.state.loginActive ? 'existing' : 'new'}-input-box`}
						togglePassword={this.togglePassword}
						showPassword={this.state.showPassword}
                        loginType = 'existing'
                        headingText = 'Please Enter Your Log In Info'
                    />
				)}
			</div>
            </section>
		);
	}
}

export default withRouter(EntranceForm)