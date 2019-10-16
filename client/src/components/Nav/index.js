import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddProvider from '../forms/AddProvider'
import AddContact from '../forms/AddContact'
import AddSymptom from '../forms/AddSymptom'
import AddInsurance from '../forms/AddInsurance'


const NavItems = ({ show }) => {
	return (
		<div className="expand-items-container" style={{ visibility: show ? 'visible' : 'hidden' }}>
			<Link to="/provider" className="expand-items">
				provider
			</Link>
			<Link to="/contact" className="expand-items">
				contact
			</Link>
			<Link to="/symptom" className="expand-items">
				symptoms
			</Link>
			<Link to="/insurance" className="expand-items">
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
		navItemsVisible: false
	};
	toggleMenu = () =>
		this.setState((state) => ({
			dropDownVisible: !state.dropDownVisible
		}));

	render() {
		return (
			<Router>
				<div className="Nav">
					<NavExpand onClick={this.toggleMenu} />
					<NavItems show={this.state.dropDownVisible} />
				</div>
        <Route exact path="/provider" component={AddProvider}/>
        <Route exact path="/contact" component={AddContact}/>
        <Route exact path="/symptom" component={AddSymptom}/>
        <Route exact path="/insurance" component={AddInsurance}/>

			</Router>
		);
	}
}

export default Nav;
