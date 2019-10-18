import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class SignInSocial extends Component {
    render() {
        return (
            <aside className="social-container">
                <h1>Otherwise...</h1>
                <div className="social-btn-container">
                    <div className="social-facebook">
                        <a className="social-btn social-facebook-btn">Log In With Facebook</a>     
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="brand-icon"/>

                    </div>
                    <div className="social-google">
                        <a className="social-btn social-google-btn">Log In With Google</a>    
                        <FontAwesomeIcon icon={['fab', 'google']} className="brand-icon"/>

                    </div>
                </div>
            </aside>
        )
    }
}