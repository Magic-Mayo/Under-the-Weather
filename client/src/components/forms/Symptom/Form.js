import React, { Component } from 'react';

export default class SymptomForm extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.formT ype}</h1>
				<p>Enter a {this.props.formType}</p>
			</div>
		);
	}
}
