import React, {Component} from 'react';
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
		<div className="expand-items-container" style={{ display: props.show ? 'flex' : 'none' }}>
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

class Nav extends Component {
	state = {
		dropDownVisible: false
    };

    toggleMenu = () =>
		this.setState((state) => ({
			dropDownVisible: !state.dropDownVisible
		}));

	render() {
		console.log('NAV HAS THESE PROPS', this.props);		
		return (
            <div>
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
                                menuState={this.state.dropDownVisible}
                                userId={this.props.userId}
                                setUser={this.props.setUser}
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
                                setUser={this.props.setUser}
                                name={this.props.name}
                                userId={this.props.userId}
                                isLoggedIn={this.props.isLoggedIn}
                                toggleMenu={this.toggleMenu}
								menuState={this.state.dropDownVisible}
                                user={this.props.user}
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
								userId={this.props.userId}
                                menuState={this.state.dropDownVisible}
                                setUser={this.props.setUser}
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
								menuState={this.state.dropDownVisible}
								name={this.props.name}
								userId={this.props.userId}
                                user={this.props.user}
                                setUser={this.props.setUser}
								/>)
					}}
				/>
            </div>
		);
	}
}

export default Nav;
