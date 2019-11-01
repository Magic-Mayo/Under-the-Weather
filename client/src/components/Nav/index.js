import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Nav(props) {
	return (
        <div className="Nav">
            <div className="expand-items-container" style={{ display: props.navOpen ? 'flex' : 'none' }}>
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
            <div className="expand-container" onClick={props.toggleNav}>
                <FontAwesomeIcon icon="plus" />
            </div>
        </div>
	);
};