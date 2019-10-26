import React from 'react';

export default function ContactsCard(props) { 
    console.log(props)
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
                <button onClick={() => props.deleteObject({_id:contact._id, card:props.card, route:props.route})}>delete</button>
                <br/>                
            </div>
        ))}
        </div>
    )    
};