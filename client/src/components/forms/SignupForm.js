import React, { Component } from 'react';
import SignInSocial from './SignInSocial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SignupForm extends Component {
	state = {
		username: '',
		password: '',
		passwordCheck: '',
		firstname: '',
		lastname: '',
		sex: {
			male: false,
			female: false
		},
		age: 0,
		currentPage: 0
	};

	handleInput = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	nextPage = (e) => {
		console.log(this.state.currentPage);
		this.setState({
			currentPage: this.state.currentPage + 1
		});
	};

	render() {
		return (
			<div className="grid">
				<form className={`form-${this.props.data.loginType}-input-box form-input-area`}>
					<h1 className="form-title">{this.props.data.headingText}</h1>
					{this.state.currentPage === 0 ? (
						<FirstPage
							handleInput={this.handleInput}
							username={this.state.username}
							password={this.state.password}
							showPassword={this.props.showPassword}
							togglePassword={this.props.togglePassword}
							passwordCheck={this.state.passwordCheck}
						/>
					) : this.state.currentPage === 1 ? (
						<SecondPage
							handleInput={this.handleInput}
							firstname={this.state.firstname}
							lastname={this.state.lastname}
							sex={this.state.sex}
							age={this.state.age}
						/>
					) : null}
					<div className="btn-container">
						<button type="button" className="btn" onClick={this.nextPage}>
							Continue
						</button>
					</div>
				</form>
				<SignInSocial />
			</div>
		);
	}
}

const FirstPage = (props) => {
	console.log(props);
	return (
		<span style={{ width: '100%' }}>
			<div className="input-container">
				<label htmlFor="username">
					<span>*</span> Username:{' '}
				</label>
				<input
					type="username"
					name="username"
					id="username"
					value={props.username}
					onChange={props.handleInput}
					placeholder="johndoe24"
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password">
					<span>*</span> Password:{' '}
				</label>
				<input
					type={props.showPassword ? 'text' : 'password'}
					name="password"
					value={props.password}
					onChange={props.handleInput}
					id="password"
				/>
				<FontAwesomeIcon
					icon={props.showPassword ? 'eye-slash' : 'eye'}
					className="eye-icon"
					onClick={props.togglePassword}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password-check">
					<span>*</span> Re-enter Password:{' '}
				</label>
				<input
					type="password"
					name="passwordCheck"
					value={props.passwordCheck}
					onChange={props.handleInput}
					id="password-check"
				/>
			</div>
		</span>
	);
};

function SecondPage(props) {
	return (
		<span style={{ width: '100%' }} className="sign-up-second-page">
			<div className="input-container">
				<label htmlFor="firstname">
					<span>*</span> First Name:{' '}
				</label>
				<input
					type="text"
					name="firstname"
					id="firstname"
					value={props.firstname}
					onChange={props.handleInput}
					placeholder="John"
				/>
			</div>
			<div className="input-container">
				<label htmlFor="lastname">
					<span>*</span> Last Name:{' '}
				</label>
				<input 
					type="text" 
					name="lastname"
					id="lastname"
					value={props.lastname} 
					onChange={props.handleInput}
					placeholder="Doe"  />
			</div>
			<div className="flex-between">
				<div className="input-container">
					<label htmlFor="sex">
						<span>*</span> Sex:{' '}
					</label>
					<input
						type="text"
						name="sex"
						id="sex"
						value={props.lastname}
						onChange={props.handleInput}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="age">
						<span>*</span> Age:{' '}
					</label>
					<input
						type="number"
						name="age"
						id="age"
						value={props.age}
						onChange={props.handleInput}
						placeholder="36"
					/>
				</div>
			</div>
		</span>
	);
}

function ThirdPage() {}
