import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContactsCard(props) {
    if(props.contact.length > 0){
        return (
            <div className="contact-card card">
                <h2>Emergency Contacts</h2>
                {props.contact.map(contact => (
                    <div key={contact._id} className="contact-card-item card">                
                        <h4 className="contact-card-item-name">{contact.name}</h4>
                        <h4 className="contact-card-item-phone">Phone: {contact.phone}</h4>

                        {props.itemIsExpanded[contact._id] && contact.address.streetAddress &&
                            <h5 className="contact-card-item-address">Address: {contact.address.streetAddress}</h5>}

                        {props.itemIsExpanded[contact._id] && contact.address.city &&
                            <h5 className="contact-card-item-city">{' '}{contact.address.city}, {contact.address.state} {contact.address.zip}</h5>}

                        {props.itemIsExpanded[contact._id] && contact.relationship &&
                            <h5 className="contact-card-item-relationship">Relationship: {contact.relationship}</h5>}
 
                            <FontAwesomeIcon
                            className="contact-card-expand item-expand item"
                            icon={props.itemIsExpanded[contact._id] ? "angle-double-up" : "angle-double-down"}
                            size="2x"
                            id={contact._id}
                            onClick={(e)=>props.expand(e)}
                            />

                        <Link to={{pathname: `dashboard/form/contact/${contact._id}`, state: {contact}}}>
                            <FontAwesomeIcon
                            icon="edit"
                            className="contact-card-edit item-edit item"
                            size="2x" 
                            />
                        </Link>
                        <br/>                
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="contact-card-empty card">
            <h2>Emergency Contacts</h2>
            <Link to={'/contact'} className="contact-card-link" style={{textDecoration: "none"}}>
                <div className="contact-card-link-container">
                    <p className="contact-card-link-add">Click here to add Emergency Contacts!</p>
                </div>
            </Link>
        </div>
    )
}