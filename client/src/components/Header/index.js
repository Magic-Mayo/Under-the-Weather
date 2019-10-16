import React, { Component } from "react";
import Umbrella from "../icons/Umbrella";
import Logo from "../icons/Logo";

const Greeting = (props) => <h1 className="header-welcome">{props.isLoggedIn ? `Welcome Back, ${props.name}` : null}</h1>;
const LoginStatus = (props) => {
  return !props.isLoggedIn && <a className="header-status" href='http://localhost:3001/auth/facebook' onClick={props.onClick}>Sign Out</a>
}; 

export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <LoginStatus isLoggedIn={this.props.isLoggedIn} onClick={this.props.handleHTTP}/>
        <Umbrella width={"100%"} height={"100%"} />
        <Logo width={"100%"} height={"100%"} />
        <Greeting isLoggedIn={this.props.isLoggedIn} name={this.props.name} />
      </div>
    );
  }
}



// PSUEDO CODE FOR SIGNING IN LINK

// renders based off of login status
// if user clicks <a></a>, sends a request to server to log in/out w/ local db & facebook & google
// server receives boolean representing log in stat 
//  changes what needs to be changed => PROMISE => send boolean back to change state.user.isLoggedIn

