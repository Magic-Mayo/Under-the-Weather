import React, { Component } from "react";
import Umbrella from "../icons/Umbrella";
import Logo from "../icons/Logo";

const Header = props => {
    return (
        <div className="header">
            {props.isLoggedIn && <button onClick={props.handleLogOut}>Sign Out</button>}
            <Umbrella width={"100%"} height={"100%"} />
            <Logo width={"100%"} height={"100%"} />
            {props.isLoggedIn && <h1 className="header-welcome">Welcome Back, {props.name}</h1>}
        </div>
    );
}

export default Header;
