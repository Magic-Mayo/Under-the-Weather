import React, { Component } from 'react';

export default class SymptomForm extends Component {
	render() {
		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What type of symptom are you experiencing?</h1>
				<p>Enter a {this.props.formType}</p>
			</div>
		);
	}
}
