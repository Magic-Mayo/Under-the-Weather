import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class InsuranceLink extends Component {
    componentDidMount = () => this.props.toggleMenu()

    render() {
        console.log(this.props);
        return (
            <div className="InsuranceLink">
                <FormContainer message="ADD INSURANCE" isLoggedIn={this.props.isLoggedIn} formType="Insurance"/>

            </div>
        )
    }
}
