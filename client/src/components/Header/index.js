import React, { Component } from "react";
import Umbrella from "../icons/Umbrella";
import Logo from "../icons/Logo";

const Greeting = (props) => <h1 className="header-welcome">{props.isLoggedIn ? `Welcome Back, ${props.name}` : null}</h1>;
const LoginStatus = (props) => <a href={props.href} className="header-status">{props.isLoggedIn ? "Sign Out" : "Log In"}</a>;


export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <LoginStatus isLoggedIn={this.props.isLoggedIn} href={this.props.isLoggedIn ? "/loggedin" : "/signup"}/>
        <Umbrella width={"100%"} height={"100%"} />
        <Logo width={"100%"} height={"100%"} />
        <Greeting isLoggedIn={this.props.isLoggedIn} name={this.props.name} />
      </div>
    );
  }
}
