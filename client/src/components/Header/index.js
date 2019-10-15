import React from 'react';
import Umbrella from '../icons/Umbrella';
import Logo from '../icons/Logo';

function Header(props) {
    return (
        <div className="header">
            <Umbrella 
                width={'100%'}
                height={'100%'}
            />
            <Logo
                width={'100%'}
                height={'100%'}
            />
            <h1 className="header-welcome">
                Welcome Back, {props.name}
            </h1>
        </div>
    );
}

export default Header;