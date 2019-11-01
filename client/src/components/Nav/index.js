import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavItems = (props) => {
	return (
		<div className="expand-items-container" style={{ display: props.show ? 'flex' : 'none' }}>
			<Link to={'/dashboard/form/provider'} className="expand-items">
				provider
			</Link>

			<Link to={'/dashboard/form/contact'} className="expand-items">
				contact
			</Link>

			<Link to={'/dashboard/form/symptom'} className="expand-items">
				symptoms
			</Link>

			<Link to={'/dashboard/form/insurance'} className="expand-items">
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
		// console.log('NAV HAS THESE PROPS', this.props);		
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
            </div>
		);
	}
}

export default Nav;
