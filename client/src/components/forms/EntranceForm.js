import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default class EntranceForm extends Component {
	state = {
		signUp: {
			page: null
		},
		parentProps: this.props
	};
	render() {
		console.log(this.props);
		const data = this.props.state.loginActive
			? {
					loginType: 'existing',
					headingText: 'Please Enter Your Log In Info',
					inputs: [
						{
							name: 'email',
							label: 'Email'
						},
						{
							name: 'password',
							label: 'Password'
						}
					]
				}
			: {
					loginType: 'new',
					headingText: 'Enter Your Info To Sign Up For a Free Account',
					pages: [
						{
							num: 0,
							inputs: [
								{
									name: 'email',
									label: 'Email'
								},
								{
									name: 'password',
									label: 'Password'
								},
								{
									name: 'password-confirm',
									label: 'Confirm Password'
								}
							]
						}
					]
				};
		return (
			<div className={`form form-${data.loginType}`}>
				{this.props.message && <p>{this.props.message}</p>}
				{data.loginType === 'new' ? (
					<SignupForm
						data={data}
						classNames={`form-input-box form-${data.loginType}-input-box`}
						togglePassword={this.props.togglePassword}
						showPassword={this.props.showPassword}
					/>
				) : (
					<LoginForm
						handleLogIn={this.props.handleLogIn}
						data={data}
						classNames={`form-input-box form-${data.loginType}-input-box`}
						togglePassword={this.props.togglePassword}
						showPassword={this.props.showPassword}
					/>
				)}
			</div>
		);
	}
}
