import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class SymptomLink extends Component {
	componentDidMount = () => {
        if(this.props.menuState){
            this.props.toggleMenu()
        }
    }
    
    render() {
        return (
            <div className="SymptomLink">
                <FormContainer 
                    isLoggedIn={this.props.isLoggedIn} 
                    message="ADD SYMPTOM" 
                    formType="Symptom"
                    userId={this.props.userId}
                />
            </div>
        )
    }
}
