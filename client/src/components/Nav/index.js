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
				<Link to={window.location.pathname + "/provider"} className="expand-items" 
				// onClick={props.toggleForm}
				>
					provider
				</Link>
			<Link to={window.location.pathname + "/contact"} className="expand-items">
				contact
			</Link>
			<Link to={window.location.pathname +"/symptom"} className="expand-items">
				symptoms
			</Link>
			<Link to={window.location.pathname +"/insurance"} className="expand-items">
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
		dropDownVisible: false,
		// DashboardURL: window.location.pathname
	};
	toggleMenu = () =>
		this.setState((state) => ({
			dropDownVisible: !state.dropDownVisible
		}));

	data = this.props
	render() {
		console.log("NAV HAS THESE PROPS", this.props);

		return (
			<Router>
				<div className="Nav">
					<NavExpand onClick={this.toggleMenu} />
					<NavItems show={this.state.dropDownVisible} toggleForm={this.props.toggleForm}/>
				</div>
				<Route exact path={window.location.pathname + "/provider"} render={() => {
					return <ProviderLink {...this.data} />
					}
				} />
				<Route exact path={window.location.pathname + "/contact"} render={() => <ContactLink {...this.data} />} />
				<Route exact path={window.location.pathname + "/symptom"} render={() => <SymptomLink {...this.data} />} />
				<Route exact path={window.location.pathname + "/insurance"} render={() => <InsuranceLink {...this.data} />} />
			</Router>
		);
	}
}

export default Nav;
