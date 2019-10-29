import React, { Component } from 'react'
import FormContainer from '../../pages/FormContainer'

export default class ContactLink extends Component {
	componentDidMount = () => {
        if(this.props.menuState){
            this.props.toggleMenu()
        }
    }

    render() {
        return (
            <div className="ContactLink">              
                <FormContainer
                setUser={this.props.setUser}
                userId={this.props.userId}
                isLoggedIn={this.props.isLoggedIn}
                formType="Contact"
                menuState={this.props.menuState}
                name={this.props.name}/>
            </div>
        )
    }
}