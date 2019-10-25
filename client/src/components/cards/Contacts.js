import React, { Component } from 'react';

export default function ContactsCard(props) {

    return (
        <div className="Contacts card">
        <h2>Emergency Contacts</h2>
        {props.user.emergencyContacts.map(contact => (
            <div key={contact._id}>
                <h4>Name: {contact.name}</h4>
                <h4>Phone Number: {contact.phone}</h4>
                {contact.address && <h4>Address: {contact.address.streetAddress}</h4>}
                {contact.address && <h4>&ensp;{contact.address.city}, {contact.address.state, contact.address.zip}</h4>}
                {contact.relationship && <h4>Relatonship: {contact.relationship}</h4>}
                <br/>
            </div>
        ))}
        </div>
    )
};