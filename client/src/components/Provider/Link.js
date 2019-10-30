import React, { Component } from 'react';
import FormContainer from '../pages/FormContainer';

export default class ProviderLink extends Component {
	componentDidMount = () => {
        if(this.props.menuState){
            this.props.toggleMenu()
        }
    }
    
	render() {
		return (
			<div className="ProviderLink">
                <FormContainer 
                message="ADD PROVIDER"
                userId={this.props.userId}
                isLoggedIn={this.props.isLoggedIn}
                formType={this.props.searchOrManual === "search" ? 
                    "Provider":"Manual"}
                setUser={this.props.setUser}/>
			</div>
		);
	}
}
