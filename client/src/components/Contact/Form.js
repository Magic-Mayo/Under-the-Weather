import React, { Component } from 'react'
import Axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';

function ContactInput(props) {
    return (
        <div className="contact-entry">
                <form className="contact-entry-grid">
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-name">
                        <label htmlFor="cName">Name:</label>
                        <input
                            type="text"
                            name="cName"
                            value={props.name}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-phone">
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="number"
                            name="phone"
                            value={props.phone}
                            onChange={props.handleInput}>
                            {/* <span style={{color: "red", fontSize: "18px"}}>{props.errors}</span> */}
                        </input>
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-relationship">
                        <label htmlFor="relationship">Relationship:</label>
                        {/* <label style={{color: "red", fontSize: "10px"}}>{props.errors}</label> */}
                        <input
                            type="text"
                            name="relationship"
                            value={props.relationship}
                            onChange={props.handleInput}>
                        </input>
                        {/* <span style={{color: "red", fontSize: "18px"}}>{props.errors}</span> */}
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-address">
                        <label htmlFor="address">Contact Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={props.address}
                            onChange={props.handleInput}>
                        </input>
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-city">
                    <label htmlFor="city">&nbsp;&nbsp;&nbsp;City:</label>
                        <input
                        name="city"
                        placeholder="Phoenix"
                        type="text"
                        value={props.city}
                        onChange={props.handleInput}
                        />
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-state">
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
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-zip">
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
                    <button className="contact-entry-grid-submit" onClick={props.contactToDatabase}>Submit</button>
                </form>
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
        relationship: '',
        errors:''
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
        if(this.state.cName !=='' && this.state.phone !== '' && this.state.relationship !== ''){
        Axios.post('/account/contact', contacts).then(
            data => {
                this.setState(this.initialState);
                this.props.setUser(data.data)
            }
        )}
        else{
            this.setState({errors: '*Required*'})
        }
    };

    render() {
		return (
			<div className="contact-form-container">
                <Link to="/dashboard" className="closeForm">
                    <button type="button" className="contact-form-close">
                        X
                    </button>
                </Link>
                <h1 className="contact-form-title">Please Enter Emergency Contact Information</h1>
                <hr></hr>
                <ContactInput
                    cName={this.state.cName}
                    phone={this.state.phone}
                    address={this.state.address}
                    relationship={this.state.relationship}
                    handleInput={this.handleInput}
                    contactToDatabase={this.contactToDatabase}
                    errors={this.state.errors}
                />
                <div className="contact-form-submit-container">
                </div>
            </div>
        );
	};
}
