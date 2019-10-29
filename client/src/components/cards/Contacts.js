import React from 'react';
import {Route,Link} from 'react-router-dom';
import ContactLink from '../forms/Contact/Link';

export default function ContactsCard(props) {
    if(props.contact.length > 0){
        return (
            <div className="Contacts card">
            <h2>Emergency Contacts</h2>
            {props.contact.map(contact => (
                <div key={contact._id}>                
                    <h4>Name: {contact.name}</h4>
                    <h4>Phone Number: {contact.phone}</h4>
                    {contact.address && <h4>Address: {contact.address.streetAddress}</h4>}
                    {contact.address && <h4>&ensp;{contact.address.city}, {contact.address.state} {contact.address.zip}</h4>}
                    {contact.relationship && <h4>Relationship: {contact.relationship}</h4>}
                    <button onClick={() => props.delete({_id:contact._id, card:props.card, route:props.route})}>delete</button>
                    <br/>                
                </div>
            ))}
            </div>
        )
    }

    return (
        <div className="Contacts card">
            <h2>Emergency Contacts</h2>
            <Link to={'/contact'} className="contact-card-link" style={{textDecoration: "none"}}>
                <div className="contact-card-link-container">
                    <p className="contact-card-link-add">Click here to add Emergency Contacts!</p>
                </div>
            </Link>
        </div>
    )
};