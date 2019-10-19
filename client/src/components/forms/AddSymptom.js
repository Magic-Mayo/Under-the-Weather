import React, { Component } from 'react'
import FormContainer from '../pages/FormContainer'

export default class AddSymptom extends Component {
    render() {
        return (
            <div className="AddSymptom">
                ADD SYMPTOM
                <FormContainer isLoggedIn={this.props.isLoggedIn} message="ADD SYMPTOM"/>

            </div>
        )
    }
}
