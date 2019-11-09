import React from 'react';
import {Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Nav(props) {
	return (
        <div className="Nav nav-expand">
            <div className="expand-items-container nav-expand" style={{ display: props.navOpen ? 'flex' : 'none' }}>
                <Link to={'/dashboard/form/provider'} className="expand-items nav-expand">
                    provider
                </Link>

                <Link to={'/dashboard/form/contact'} className="expand-items nav-expand">
                    contact
                </Link>

                <Link to={'/dashboard/form/symptom'} className="expand-items nav-expand">
                    symptoms
                </Link>

                <Link to={'/dashboard/form/insurance'} className="expand-items nav-expand">
                    insurance
                </Link>
            </div>
            <div className="expand-container nav-expand" onClick={(e)=>props.toggleNav(e)}>
                {props.navOpen ? "-":"+"}
            </div>
        </div>
	);
};