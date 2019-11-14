import React, { Component } from 'react'
import Axios from 'axios';
import moment from 'moment';
import { Link } from  'react-router-dom';

function ContactInput(props) {
    return (
        <div className="contact-entry-container">
                <form className="contact-entry-grid">
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-name">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
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
                            onChange={props.handleInput}
                            placeholder="XXX-XXX-XXXX">
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
                            onChange={props.handleInput}
                            placeholder="Mother, Father, Friend, etc.">
                        </input>
                        {/* <span style={{color: "red", fontSize: "18px"}}>{props.errors}</span> */}
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-address">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="streetAddress"
                            value={props.address}
                            onChange={props.handleInput}
                            placeholder="123 W Main St">
                        </input>
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-city">
                    <label htmlFor="city">City:</label>
                        <input
                        name="city"
                        placeholder="Phoenix"
                        type="text"
                        value={props.city}
                        onChange={props.handleInput}
                        />
                    </div>
                    <div className="input-container contact-entry-grid-item contact-entry-grid-item-state">
                    <label htmlFor="state">State:</label>
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
                    <label htmlFor="zip">ZIP:</label>
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
                </form>
        </div>
    )
};

export default class Form extends Component {
    initialState = {
        userId: this.props.userId,
        name: '',
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

    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        if(this.props.location.state){
            const {state} = this.props.location;
            if(state.contact){
                this.setState({
                    name: state.contact.name || '',
                    phone: state.contact.phone || '',
                    streetAddress: state.contact.address.streetAddress || '',
                    city: state.contact.address.city || '',
                    state: state.contact.address.state || '',
                    zip: state.contact.address.zip || '',
                    relationship: state.contact.relationship || ''
                })
            }

            if (state.signup){
                this.setState({signup: true})
            }

            if(state.update){
                this.setState({update:true})
            }

        }
    }
    
    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    contactToDatabase = () => {
        const contacts = {
            route: 'addcontact',
            contact:{
                name: this.state.name,
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

    update = id => {
        console.log(id)
        const updatedData = {
            route: "updatecontact",
            contact: {"data.emergencyContacts.$": {
                name: this.state.name,
                phone: this.state.phone,
                relationship: this.state.relationship,
                address: {
                    streetAddress: this.state.streetAddress,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip
                },
                updatedAt: moment()
            }},
            key: "data.emergencyContacts._id",
            id: id
        }

        return Axios.put('/account/contact', updatedData).then(user=>{
            console.log(user)
            this.props.setUser(user.data)
        })
    }

    render() {
		return (
			<div className="contact-form-container form">
                <h1 className="contact-form-title">{this.state.update ? "Update" : "Please Enter"} Emergency Contact Information</h1>
                <hr></hr>
                <ContactInput
                    name={this.state.name}
                    phone={this.state.phone}
                    address={this.state.address}
                    relationship={this.state.relationship}
                    handleInput={this.handleInput}
                    contactToDatabase={this.contactToDatabase}
                    errors={this.state.errors}
                />
                <div className="contact-form-submit-container">
                    {this.state.signup &&
                        <Link to={{pathname: "/", state: {details: true, currentPage: 4}}}>
                            <button type="button" className="back-to-details button">
                                Back to Details Page
                            </button>
                        </Link>
                    }

                <button
                className="contact-form-submit"
                onClick={this.state.update ? () => this.update(this.props.match.params.id) : this.contactToDatabase}>
                    {this.state.update ? "Update" : "Submit"}</button>
                </div>
            </div>
        );
	};
}
