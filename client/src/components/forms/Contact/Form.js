import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';

function ContactInput(props) {
    return (
        <div className="contact-entry">
                <form className="contact-entry-grid">
                    <div>
                        <label htmlFor="cName">Emergency Contact Name:</label>
                        <input
                            type="text"
                            name="cName"
                            value={props.name}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="phone">Emergency Contact Phone Number:</label>
                        <input
                            type="number"
                            name="phone"
                            value={props.phone}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="address">Emergency Contact Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={props.address}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                    <div>
                    <label htmlFor="city">&nbsp;&nbsp;&nbsp;City:</label>
                        <input
                        name="city"
                        placeholder="Phoenix"
                        type="text"
                        value={props.city}
                        onChange={props.handleInput}
                        />
                    </div>
                    <div>
                    <label htmlFor="state">&nbsp;&nbsp;&nbsp;State:</label>
                        <input
                        name="state"
                        maxLength="2"
                        minLength="2"
                        placeholder="AZ"
                        type="address"
                        value={props.state}
                        onChange={props.handleInput}
                        />
                    </div>
                    <div>
                    <label htmlFor="zip">&nbsp;&nbsp;&nbsp;ZIP:</label>
                        <input
                        name="zip"
                        placeholder="85008"
                        min="00000"
                        max="99999"
                        type="number"
                        value={props.zip}
                        onChange={props.handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="relationship">Emergency Contact Relationship to User:</label>
                        <input
                            type="text"
                            name="relationship"
                            value={props.relationship}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                </form>
            <button onClick={props.contactToDatabase}>Submit</button>
        </div>
    )
};

export default class Form extends Component {
    initialState = {
        userId: this.props.userId,
        cName: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        relationship: ''
    }

    state = {
        ...this.initialState
    }
    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };    
    contactToDatabase = () => {
        const contacts = {
            route: 'addcontact',
            contact:{
                name: this.state.cName,
                phone: this.state.phone,
                address: {
                    streetAddress: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip
                },
                relationship: this.state.relationship,
                createdAt: moment()
            },
            userId: this.state.userId
        };
        Axios.post('/account/contact', contacts).then(
            data => {
                this.setState(this.initialState);
                this.props.setUser(data.data)
            }
        )
    };

    render() {
		return (
			<div>
                <h1>Hello, {this.props.name}</h1>
                <h2>Add Emergency Contact information</h2>
                <ContactInput 
                    cName={this.state.cName}
                    phone={this.state.phone}
                    address={this.state.address}
                    relationship={this.state.relationship}			
                    handleInput={this.handleInput}
                    contactToDatabase={this.contactToDatabase}
                />	    		
                <div className="contact-form-submit-container">
                    <Link to="/dashboard" className="closeForm">
                        <button type="button" className="contact-form-close">
                            Close Form X
                        </button>
                    </Link>
                </div>
            </div>
    );
	};
}
