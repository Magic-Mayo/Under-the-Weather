import React, { Component } from 'react'
import SignInSocial from './SignInSocial'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class LoginForm extends Component {
    render() {
        // console.log(this.props.data.className)
        return (
            <form className={`login-form-${this.props.data.loginType}-input-box login-form-input-area`}>
                <div className="input-container">
                    <label htmlFor="email"><span>*</span> Email: </label>
                    <input type="email" name="email" id="email" placeholder="johndoe@emaildomain.com"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password"><span>*</span> Password: </label>
                    <input type="password" name="password" id="password"/>
                    <FontAwesomeIcon icon="eye" className="eye-icon"/>
                </div>               
                <div className="btn-container">
                    <SignInSocial />
                    <button type="button" className="btn">Log In</button>
                </div>
            </form>
        )
    }
}
