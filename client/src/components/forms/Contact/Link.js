import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class ContactLink extends Component {
	componentDidMount = () => this.props.toggleMenu()

    render() {
        return (
            <div className="ContactLink">
                ADD CONTACT
                <FormContainer message="ADD CONTACT"
                  name={this.props.name}
                  getNewUserInfo={this.props.getNewUserInfo}
                  userId={this.props.userId}
                  isLoggedIn={this.props.isLoggedIn}
                formType="Contact"/>
            </div>
        )
    }
}
