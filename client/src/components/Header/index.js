import React, { Component } from "react";
import Umbrella from "../icons/Umbrella";
import Logo from "../icons/Logo";

function Greeting(props) {
  if (props.isLoggedIn) {
    return <h1 className="header-welcome">Welcome Back, {props.name}</h1>;
  } else return null
}

export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <Umbrella width={"100%"} height={"100%"} />
        <Logo width={"100%"} height={"100%"} />
        <Greeting isLoggedIn={this.props.isLoggedIn} name={this.props.name} />
      </div>
    );
  }
}
