import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddProvider from '../forms/AddProvider';
import AddContact from '../forms/AddContact';
import AddSymptom from '../forms/AddSymptom';
import AddInsurance from '../forms/AddInsurance';
import Dashboard from '../pages/Dashboard';

const NavItems = (props) => {
	return (
		<div className="expand-items-container" style={{ visibility: props.show ? 'visible' : 'hidden' }}>
			<Link to={"/provider"} className="expand-items">
				provider
			</Link>
			<Link to={"/contact"} className="expand-items">
				contact
			</Link>
			<Link to={"/symptom"} className="expand-items">
				symptoms
			</Link>
			<Link to={"/insurance"} className="expand-items">
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
		navItemsVisible: false,
		// DashboardURL: window.location.pathname
	};
	toggleMenu = () =>
		this.setState((state) => ({
			dropDownVisible: !state.dropDownVisible
		}));

	data = this.props
	render() {
		return (
			<Router>
				<div className="Nav">
					<NavExpand onClick={this.toggleMenu} />
					<NavItems show={this.state.dropDownVisible}/>
				</div>
				<Route exact path="/provider" render={() => <AddProvider {...this.data} />} />
				<Route exact path="/contact" render={() => <AddContact {...this.data} />} />
				<Route exact path="/symptom" render={() => <AddSymptom {...this.data} />} />
				<Route exact path="/insurance" render={() => <AddInsurance {...this.data} />} />
			</Router>
		);
	}
}

export default Nav;
