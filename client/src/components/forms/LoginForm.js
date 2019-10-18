import React, { Component } from 'react'
import SignInSocial from './SignInSocial'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class LoginForm extends Component {
    render() {
        // console.log(this.props.data.className)
        return (
            <form className={`login-form-${this.props.data.loginType}-input-box login-form-input-area`}>
                {this.props.data.loginType}
                <aside className="social-container">
                    <SignInSocial />
                </aside>
            </form>
        )
    }
}
