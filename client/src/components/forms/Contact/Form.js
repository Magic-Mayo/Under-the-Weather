import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.formType}</h1>
                <p>Enter a {this.props.formType}</p>
            </div>
        )
    }
}
