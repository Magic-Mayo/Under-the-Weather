import React, { Component } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default class EntranceForm extends Component {
	state = {
        signUp: {
            page: null
        },
        parentProps: this.props
	}
	render() {
        const data = this.props.loginActive ? {
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
        }
		return (
			<div className={`login-form login-form-${data.loginType}`}>
                <h1 className="login-form-title">{data.headingText}</h1>
                {
                    this.props.message && <p>{this.props.message}</p>
                }
                {
                    data.loginType === "new" 
                    ? <SignupForm data={data} classNames={`login-form-input-box login-form-${data.loginType}-input-box`}/>
                    : <LoginForm data={data} classNames={`login-form-input-box login-form-${data.loginType}-input-box`}/> 
                }
			</div>
		);
	}
}
