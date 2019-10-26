import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class SymptomLink extends Component {
    componentDidMount = () => this.props.toggleMenu()

    render() {
        return (
            <div className="SymptomLink">
                ADD SYMPTOM
                <FormContainer 
                    isLoggedIn={this.props.isLoggedIn} 
                    message="ADD SYMPTOM" 
                    formType="Symptom"
                    handleChange={this.props.handleChange}
                    handleSubmit={this.props.handleSubmit}
                    />
            </div>
        )
    }
}
