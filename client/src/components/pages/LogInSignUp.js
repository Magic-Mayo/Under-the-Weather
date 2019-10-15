import React, { Component } from 'react'

export default class LogInSignUp extends Component {
    state = {
        loginActive: true,
        signupActive: false

    }

    toggleForm =() => {
        this.setState(state => ({
            signupActive: state.loginActive,
            loginActive: !state.loginActive
        }))
    }

    setLogIn = () => {
        this.setState(() => ({
            loginActive: true,
            signupActive: false
        }))
    }

    setSignUp = () => {
        this.setState(() => ({
            signupActive: true,
            loginActive: false
        }))
    }

    render() {
        console.log(this.state);
        return (
            <div className="LogInSignUp">
                <section className={`login-form-container card ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}>
                    <div className="login-form-btn-wrapper">
                        <button className="login-form-btn login-form-btn-signup" onClick={this.setSignUp}>
                            Sign Up
                        </button>
                        <button className="login-form-btn login-form-btn-login" onClick={this.setLogIn}>
                            Log In
                        </button>
                    </div>
                    <EntranceForm loginActive={this.state.loginActive} toggleForm={this.toggleForm}/>
                </section>
            </div>
        )
    }
}

function EntranceForm({loginActive, toggleForm}) {
    if (loginActive) {
        return (
            <div className="login-form login-form-existing">
                <h1 className="login-form-title">Please Enter Your Log In Info</h1>
            </div>
        )
    } else {
        return ( 
            <div className="login-form login-form-new">
                <h1 className="login-form-title">Please Enter Your Log In Info</h1>
            </div>
        )
    }
}


