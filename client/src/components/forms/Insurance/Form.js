import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class InsuranceForm extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p>
				<Link to="/dashboard" className="closeForm">
					<button type="button" className="insurance-form-close">
						Close Form X
					</button>
				</Link>
			</div>
		);
	}
}
