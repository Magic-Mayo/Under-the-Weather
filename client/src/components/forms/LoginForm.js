import React, { Component } from 'react'
import SignInSocial from './SignInSocial'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        // console.log(this.props.data.className)
        return (
            <form className={`login-form-${this.props.data.loginType}-input-box login-form-input-area`}>
                <div className="input-container">
                    <label htmlFor="email"><span>*</span> Email: </label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInput} placeholder="johndoe@emaildomain.com"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password"><span>*</span> Password: </label>
                    <input type="password" name="password" id="password" onChange={this.handleInput} value={this.state.password}/>
                    <FontAwesomeIcon icon="eye" className="eye-icon"/>
                </div>               
                <div className="btn-container">
                    <SignInSocial />
                    <button type="button" className="btn" onClick={()=>this.props.handleLogIn({credentials: this.state})}>Log In</button>
                </div>
            </form>
        )
    }
}
