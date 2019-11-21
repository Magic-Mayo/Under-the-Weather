import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleLogin from 'react-google-login';
// import {FacebookProvider, LoginButton} from 'react-facebook';
import Axios from 'axios'


export default class SignInSocial extends Component {

      logIn = res => {
        console.log(res)
        if(res.profile){
            const user = res.profile
            const data = {
                userName: user.id,
                socialMedia: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            }

            return Axios.post('/auth/facebook', data).then(facebook=>{
                localStorage.setItem('_underweather', facebook.data.token);
                this.props.setUser({loading: false, user: facebook.data.user, userId: facebook.data.userId, isLoggedIn: true});
            })
        }

        const user = res.w3
        const data = {
            userName: user.Eea,
            socialMedia: true,
            data: {
                firstName: res.profileObj.givenName,
                lastName: res.profileObj.familyName,
                email: user.U3
            }
        }

        Axios.post('/auth/google', data).then(google=>{
            localStorage.setItem('_underweather', google.data.token);
            this.props.setUser({loading: false, user: google.data.user, userId: google.data.userId, isLoggedIn: true});
        })
    }

    render() {
        return (
            <aside className="social-container">
                <h1 className="form-title">Or you can...</h1>
                <div className="social-btn-container">
                    {/* <FacebookProvider appId={'548598765887410'}>
                        <LoginButton className="social-facebook" disabled={true} onCompleted={this.logIn} onFailure={err=>console.log(`Facebook login error: ${err}`)} scope={"public_profile,email"}>
                        <span className="social-btn social-facebook-btn">Log In With Facebook</span>
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="brand-icon"/>
                        </LoginButton>
                    </FacebookProvider> */}
                    <button type="button" disabled={true} className="social-facebook">
                        Coming soon....Log In with Facebook
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="brand-icon"/>
                    </button>
                    <GoogleLogin
                        className="social-google"
                        clientId={"714177159375-e1h4kf4c3cjgehmscn6mpeoblhqaqlaf.apps.googleusercontent.com"}
                        buttonText={"Login with Google"}
                        onSuccess={this.logIn}
                        onFailure={err=>console.log(`Google login error: ${err}`)}
                        render={renderProps=>(
                            <div className="social-google" onClick={renderProps.onClick}>
                                <span className="social-btn social-google-btn">Log In With Google</span>
                                <FontAwesomeIcon icon={['fab', 'google']} className="brand-icon"/>
                            </div>
                        )}
                    />
                </div>
            </aside>
        )
    }
}
