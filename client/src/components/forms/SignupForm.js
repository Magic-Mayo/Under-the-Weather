import React, { Component } from 'react';
import SignInSocial from './SignInSocial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

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
    
    signUpUser = () => {
        if (this.state.password !== this.state.passwordCheck || !this.validatePassword()){
            return console.log('pass no match')
        }
        if (this.state.username && this.state.password){
            axios.post('/newlocal', this.state).then(user=>{

                this.setState({user: user.data.data, userId: user.data._id, page: this.state.page + 1})
                console.log(user)
            })
        }
    }

    validatePassword = () => {
        // Validates password as having one upper and lower case, one number, and at least 8 characters
        if (this.state.password.match(/^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)([a-zA-Z0-9]+)$/) && this.state.password.length>=8){
            return true
        }
    }

    checkUser = () => {
        axios.get('/check', this.state.username).then(user=>{
            // Let client know user already exists
            if(user.data){
                return console.log('user taken')
            }
        })
    }

	render() {
		return (
			<div className="login-grid">
				<form className={`login-form-${this.props.data.loginType}-input-box login-form-input-area`}>
                <h1 className="login-form-title">{this.props.data.headingText}</h1>
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
                            onBlur={this.checkUser}
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
                            onBlur={this.validatePassword}
                            id="password"
                            required
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
                            required
						/>
					</div>
					<div className="btn-container">
						<button type="button" className="btn" onClick={this.signUpUser}>
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
