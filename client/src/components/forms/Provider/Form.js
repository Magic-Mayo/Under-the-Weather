import React, { Component } from 'react';
import Search from './Search';
export default class ProviderForm extends Component {
	render() {
		return (
			<div className="provider-form-container">
				<div className="provider-form-options">
					<button type="button" className="provider-form-option-search">
						Search By Specialty
					</button>
					<button type="button" className="provider-form-option-manual">
						Enter Info Manually
					</button>
				</div>
				<h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p>
				<Search />
			</div>
		);
	}
}
