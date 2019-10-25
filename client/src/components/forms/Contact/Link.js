import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class ContactLink extends Component {
	componentDidMount = () => this.props.toggleMenu()

    render() {
        return (
            <div className="ContactLink">              
                <FormContainer setUser={this.props.setUser} userId={this.props.userId} name={this.props.name} isLoggedIn={this.props.isLoggedIn} formType="Contact"/>
            </div>
        )
    }
}
