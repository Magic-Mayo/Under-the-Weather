import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class SymptomLink extends Component {
    render() {
        return (
            <div className="SymptomLink">
                ADD SYMPTOM
                <FormContainer isLoggedIn={this.props.isLoggedIn} message="ADD SYMPTOM" formType="Symptom"/>
            </div>
        )
    }
}
