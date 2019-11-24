import React from 'react';
import Header from './Header';
import { Link, Redirect } from 'react-router-dom';

export default function Demo(props){
	if(props.redirect){
		return (
			<Redirect to="/login/form"/>
		)
	} else {
		props.redirectToLogin();
	}

		return (
			<>
				<Header />
				<div className="demo">
					<h1 className="demo-redirect">Demo page is still under construction.  Please click 
						<Link to="/login/form"> here </Link>
					to log in or register if you are not automatically redirected.
					</h1>
				</div>
			</>
		)
}