import React, { Component } from 'react';
import SignInSocial from './SignInSocial';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoginForm extends Component {
	state = {
		username: '',
        password: '',
        loginpersist: false
	};

	handleInput = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		this.setState({ [name]: value });
	};

	render() {
		console.log(this.state.loginpersist)
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
                            placeholder="janedoe24"
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
						<FontAwesomeIcon icon="eye" className="eye-icon" onClick={this.props.togglePassword} />
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
