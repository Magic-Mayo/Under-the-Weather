import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProviderLink from '../forms/Provider/Link';
import ContactLink from '../forms/Contact/Link';
import SymptomLink from '../forms/Symptom/Link';
import InsuranceLink from '../forms/Insurance/Link';
// import Dashboard from '../pages/Dashboard';

const NavItems = (props) => {
	return (
		<div className="expand-items-container" style={{ visibility: props.show ? 'visible' : 'hidden' }}>
			<Link to={'/provider'} className="expand-items">
				provider
			</Link>

			<Link to={'/contact'} className="expand-items">
				contact
			</Link>

			<Link to={'/symptom'} className="expand-items">
				symptoms
			</Link>

			<Link to={'/insurance'} className="expand-items">
				insurance
			</Link>
		</div>
	);
};

const NavExpand = ({ onClick }) => {
	return (
		<div className="expand-container" onClick={onClick}>
			<FontAwesomeIcon icon="plus" />
		</div>
	);
};

class Nav extends React.Component {
	state = {
		dropDownVisible: false
    };

	toggleMenu = () =>
		this.setState((state) => ({
			dropDownVisible: !state.dropDownVisible
		}));

	render() {
		// console.log('NAV HAS THESE PROPS', this.props);

		return (
			<Router>
				<div className="Nav">
					<NavExpand onClick={this.toggleMenu} />
					<NavItems
						toggleMenu={this.toggleMenu}
						show={this.state.dropDownVisible}
						toggleForm={this.props.toggleForm}
					/>
				</div>
				<Route
					exact
					path={'/provider'}
					render={() => {
						return (
							<ProviderLink
								isLoggedIn={this.props.isLoggedIn}
								toggleMenu={this.toggleMenu}
                                dropDownVisible={this.state.dropDownVisible}
                                userId={this.props.userId}
                                getNewUserInfo={this.props.getNewUserInfo}
                                user={this.props.user}
							/>
						);
					}}
				/>
				<Route
					exact
					path={'/contact'}
					render={() => {
						return (
							<ContactLink
                                isLoggedIn={this.props.isLoggedIn}
                                toggleMenu={this.toggleMenu}
								dropDownVisible={this.state.dropDownVisible}
							/>
						);
					}}
				/>
				<Route 
					exact 
					path={'/symptom'} 
					render={() => {
						return (
							<SymptomLink 
                                isLoggedIn={this.props.isLoggedIn}
                                toggleMenu={this.toggleMenu}
								dropDownVisible={this.state.dropDownVisible}
							/>
						)
					}}
				/>
				<Route 
					exact 
					path={'/insurance'} 
					render={() => {
						return (
							<InsuranceLink 
                                isLoggedIn={this.props.isLoggedIn}
                                toggleMenu={this.toggleMenu}
								dropDownVisible={this.state.dropDownVisible}
							/>)
					}}
				/>
			</Router>
		);
	}
}

export default Nav;
