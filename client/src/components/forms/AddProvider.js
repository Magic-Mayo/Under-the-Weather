import React, { Component } from 'react'
import FormContainer from '../pages/FormContainer'

export default class AddProvider extends Component {
    render() {
        return (
            <div className="AddProvider">
                ADD PROVIDER
                <FormContainer message="ADD PROVIDER" isLoggedIn={this.props.isLoggedIn}/>

            </div>
        )
    }
}
