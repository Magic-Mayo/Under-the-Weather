import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class ContactLink extends Component {
    // componentDidMount() {

    // }
    render() {
        return (
            <div className="ContactLink">
                ADD CONTACT
                <FormContainer message="ADD CONTACT" isLoggedIn={this.props.isLoggedIn} formType="Contact"/>
            </div>
        )
    }
}
