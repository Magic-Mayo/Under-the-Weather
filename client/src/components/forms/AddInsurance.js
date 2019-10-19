import React, { Component } from 'react'
import FormContainer from '../pages/FormContainer'

export default class AddInsurance extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="AddInsurance">
                <FormContainer message="ADD INSURANCE"/>

            </div>
        )
    }
}
