import React, { Component } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'

export default class EntranceForm extends Component {
	state = {
        signUp: {
            page: null
        },
        parentProps: this.props
    }
    
    componentDidMount(){
        const UTWtoken = localStorage.getItem('_underweather');
        if (UTWtoken && !this.state.isLoggedIn){
            return axios.post('/token', {token: UTWtoken}).then(user=>{
                if (!user.data){return}
                
                return window.location.pathname = `dashboard/${user.data._id}`
            }).catch(err=>console.log(err))
        }
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
                {
                    this.props.message && <p>{this.props.message}</p>
                }
                {
                    data.loginType === "new" 
                    ? <SignupForm setUser={this.props.setUser} data={data} classNames={`login-form-input-box login-form-${data.loginType}-input-box`} togglePassword={this.props.togglePassword} showPassword={this.props.showPassword}/>
                    : <LoginForm setUser={this.props.setUser} handleLogIn={this.props.handleLogIn} data={data} classNames={`login-form-input-box login-form-${data.loginType}-input-box`}  togglePassword={this.props.togglePassword} showPassword={this.props.showPassword}/> 
                }
			</div>
		);
	}
}
