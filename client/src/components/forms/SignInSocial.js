import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class SignInSocial extends Component {
    render() {
        return (
            <aside className="social-container">
                <h1 className="form-title">Or you can...</h1>
                <div className="social-btn-container">
                    <div className="social-facebook">
                        <span href='http://localhost:3001/auth/facebook' className="social-btn social-facebook-btn">Log In With Facebook</span>
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="brand-icon"/>
                    </div>
                    <div className="social-google">
                        <span className="social-btn social-google-btn">Log In With Google</span>
                        <FontAwesomeIcon icon={['fab', 'google']} className="brand-icon"/>

                    </div>
                </div>
            </aside>
        )
    }
}
