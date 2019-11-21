import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props){
	return (
		<nav className="demo-header">
			<Link to="/login" className="demo-login">
				Register/Log In
			</Link>
		</nav>
	)
}