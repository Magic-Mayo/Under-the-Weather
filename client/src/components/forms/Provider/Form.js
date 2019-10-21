import React, { Component } from 'react';
import Doctor from '../../doctorSearch';
export default class ProviderForm extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p>
				<Doctor />
			</div>
		);
	}
}
