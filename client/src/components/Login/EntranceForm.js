import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { withRouter } from 'react-router';

class EntranceForm extends Component {
	state = {
		currentPage: 0,
        showPassword: false
    };

    togglePassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

	render() {                
		return (
			<div className={`form form-${this.props.loginActive ? 'existing' : 'new'}`}>
                <div className="form-btn-wrapper">
                    <button
                    disabled={!this.props.loginActive}
                    className={`form-btn form-btn-signup ${!this.props.loginActive && 'disabled'}`}
                    onClick={this.props.toggleSignUporLogIn}
                    >
                        Sign Up
                    </button>
                    <button
                    disabled={this.props.loginActive}
                    className={`form-btn form-btn-login ${this.props.loginActive && 'disabled'}`}
                    onClick={this.props.toggleSignUporLogIn}
                    >
                        Log In
                    </button>
                </div>

				{!this.props.loginActive ? (
					<SignupForm
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
						togglePassword={this.togglePassword}
						showPassword={this.state.showPassword}
                        loginType = 'existing'
                        headingText = 'Please Enter Your Log In Info'
                        error={this.props.error}
                    />
				)}
			</div>
		);
	}
}

export default withRouter(EntranceForm)