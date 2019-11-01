import React, { Component } from 'react';
import SignInSocial from './SignInSocial';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoginForm extends Component {
	state = {
		email: '',
        password: '',
        loginpersist: false
	};

	handleInput = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="grid">
				<form className={`form-${this.props.loginType}-input-box form-input-area`}>
					<h1 className="form-title">{this.props.headingText}</h1>
					<div className="input-container">
						<label htmlFor="email">
							<span>*</span> Email:{' '}
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={this.state.email}
							onChange={this.handleInput}
                            placeholder="janedoe24@gmail.com"
                            required
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
                            required
						/>
						<FontAwesomeIcon icon={this.props.showPassword ? "eye-slash":"eye"} className="eye-icon" onClick={this.props.togglePassword} />
					</div>
					<div className="btn-container">
						<button
							type="button"
							className="btn"
							onClick={() => this.props.handleLogIn({ credentials: this.state })}
						>
							Log In
						</button>
                        <label htmlFor="login-persist" className="login-persist">Keep me logged in</label>
                        <input type="checkbox"
                            onChange={this.handleInput}
                            checked={this.state.loginpersist}
                            name="loginpersist"
                        />
					</div>
				</form>
                <SignInSocial setUser={this.props.setUser} />
			</div>
		);
	}
}
