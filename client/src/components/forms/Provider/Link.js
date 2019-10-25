import React, { Component } from 'react';
import FormContainer from '../../pages/FormContainer';

export default class ProviderLink extends Component {

	componentDidMount = () => this.props.toggleMenu()

	render() {
		return (
			<div className="ProviderLink">
                <FormContainer 
                message="ADD PROVIDER"
                userId={this.props.userId}
                isLoggedIn={this.props.isLoggedIn}
                formType="Provider"
                setUser={this.props.setUser}/>
			</div>
		);
	}
}
