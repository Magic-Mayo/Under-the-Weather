import React, { Component } from 'react';

export default class EntranceForm extends Component {
	state = {
        signUp: {
            page: null
        },
        loginActive: this.props.loginActive
	}
	render() {
        console.log(this.state)
        const data = this.state.loginActive ? {
                loginType: 'existing',
                headingText: 'Please Enter Your Log In Info',
                inputs: [
                    {
                        name: 'email',
                        label: 'Email',
                    },
                    {
                        name: 'password',
                        label: 'Password',
                    },
                ]
            }
        : {
                loginType: 'new',
                headingText: 'Enter Your Info To Sign Up For a Free Account'
        }
		return (
			<div className={`login-form login-form-${data.loginType}`}>
				<h1 className={`login-form-title`}>{data.headingText}</h1>
			</div>
		);
	}
}
