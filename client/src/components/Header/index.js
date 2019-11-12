import React from "react";
import Umbrella from "../icons/Umbrella";
// import Modal from '../Modal/modal'
import Logo from "../icons/Logo";

const Header = props => {
    return (
        <div className="header">
            {props.isLoggedIn && <button onClick={props.handleLogOut} className="header-sign-out">Sign Out</button>}
            <Umbrella width={"100%"} height={"100%"} />
            <Logo width={"100%"} height={"100%"} />
            {props.isLoggedIn && <h1 className="header-welcome">Welcome Back, {props.name.firstName}</h1>}
            {/* <Modal /> */}
        </div>
    );
}

export default Header;