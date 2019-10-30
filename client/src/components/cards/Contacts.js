import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ContactLink from '../forms/Contact/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ContactsCard extends Component {
    state = {

    }

    expand = e => {
        const {id} = e.currentTarget
        console.log(id)
        this.setState({[id]: !this.state[id]})
    }

    render(){
        if(this.props.contact.length > 0){
            return (
                <div className="contact-card card">
                    <h2>Emergency Contacts</h2>
                    {this.props.contact.map(contact => (
                        <div key={contact._id} id={contact._id} className="contact-card-item" onClick={this.expand}>                
                            <h4 className="contact-card-item-name">Name: {contact.name}</h4>
                            <h4 className="contact-card-item-phone">Phone Number: {contact.phone}</h4>
                            {this.state[contact._id] && <h4 className="contact-card-item-address">Address: {contact.address.streetAddress}</h4>}
                            {this.state[contact._id] && <h4 className="contact-card-item-city">&ensp;{contact.address.city}, {contact.address.state} {contact.address.zip}</h4>}
                            {this.state[contact._id] && <h4 className="contact-card-item-relationship">Relationship: {contact.relationship}</h4>}
                            <FontAwesomeIcon
                            icon="minus-circle"
                            className = "contacts-delete"
                            size="2x" 
                            onClick={() => this.props.delete({_id:contact._id, card:this.props.card, route:this.props.route})}>
                            </FontAwesomeIcon> 
                            <br/>                
                        </div>
                    ))}
                </div>
            )
        }

        return (
            <div className="contact-card-empty">
                <h2>Emergency Contacts</h2>
                <Link to={'/contact'} className="contact-card-link" style={{textDecoration: "none"}}>
                    <div className="contact-card-link-container">
                        <p className="contact-card-link-add">Click here to add Emergency Contacts!</p>
                    </div>
                </Link>
            </div>
        )
    }
};