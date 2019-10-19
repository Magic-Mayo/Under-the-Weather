import React, { Component } from 'react';
import SignInSocial from './SignInSocial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SignupForm extends Component {
	state = {
		username: '',
		password: '',
		passwordCheck: ''
	};

	handleInput = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="grid">
				<form className={`form-${this.props.data.loginType}-input-box form-input-area`}>
                <h1 className="form-title">{this.props.data.headingText}</h1>
					<div className="input-container">
						<label htmlFor="username">
							<span>*</span> Username:{' '}
						</label>
						<input
							type="username"
							name="username"
							id="username"
							value={this.state.username}
							onChange={this.handleInput}
							placeholder="johndoe24"
						/>
					</div>
					<div className="input-container">
						<label htmlFor="password">
							<span>*</span> Password:{' '}
						</label>
						<input
							type={this.props.showPassword ? 'text' : 'password'}
							name="password"
							value={this.state.password}
							onChange={this.handleInput}
							id="password"
						/>
						<FontAwesomeIcon
							icon={this.props.showPassword ? 'eye-slash' : 'eye'}
							className="eye-icon"
							onClick={this.props.togglePassword}
						/>
					</div>
					<div className="input-container">
						<label htmlFor="password-check">
							<span>*</span> Re-enter Password:{' '}
						</label>
						<input
							type="password"
							name="passwordCheck"
							value={this.state.passwordCheck}
							onChange={this.handleInput}
							id="password-check"
						/>
					</div>
					<div className="btn-container">
						<button type="button" className="btn">
							Continue
						</button>
					</div>
				</form>
                <SignInSocial />
			</div>
		);
	}
}

function firstPage() {}

function secondPage() {}

function thirdPage() {}
