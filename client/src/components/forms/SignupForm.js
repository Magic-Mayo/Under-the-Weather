import React, { Component } from 'react'
import SignInSocial from './SignInSocial'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        passwordCheck: ''
    }

    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        // console.log(this.props.data.loginTypes)

        return (
            <form className={`login-form-${this.props.data.loginType}-input-box login-form-input-area`}>
                <div className="input-container">
                    <label htmlFor="email"><span>*</span> Email: </label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInput} placeholder="johndoe@emaildomain.com"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password"><span>*</span> Password: </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInput} id="password"/>
                    <FontAwesomeIcon icon="eye" className="eye-icon"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password-check"><span>*</span> Re-enter Password: </label>
                    <input type="password-check" name="passwordCheck" value={this.state.passwordCheck} onChange={this.handleInput} id="password-check"/>
                    {/* <FontAwesomeIcon icon="eye" className="eye-icon"/> */}
                </div>
                <div className="btn-container">
                    <button type="button" className="btn">Continue</button>
                    <SignInSocial/>

                </div>
            </form>
        )
    }
}
