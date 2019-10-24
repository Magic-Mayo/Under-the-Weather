import React, { Component } from 'react';
import FormContainer from '../../pages/FormContainer';

export default class ProviderLink extends Component {

	componentDidMount = () => this.props.toggleMenu()

	render() {
		return (
			<div className="ProviderLink">
				<FormContainer message="ADD PROVIDER" isLoggedIn={this.props.isLoggedIn} formType="Provider" />
			</div>
		);
	}
}
