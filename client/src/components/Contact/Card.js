import React from 'react';
import {Link} from 'react-router-dom';
// import ContactLink from './Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContactsCard(props) {
    if(props.contact.length > 0){
        return (
            <div className="contact-card card">
                <h2>Emergency Contacts</h2>
                {props.contact.map(contact => (
                    <div key={contact._id} className="contact-card-item">                
                        <h4 className="contact-card-item-name">Name: {contact.name}</h4>
                        <h4 className="contact-card-item-phone">Phone Number: {contact.phone}</h4>
                        {props.itemIsExpanded[contact._id] && <h4 className="contact-card-item-address">Address: {contact.address.streetAddress}</h4>}
                        {props.itemIsExpanded[contact._id] && <h4 className="contact-card-item-city">&ensp;{contact.address.city}, {contact.address.state} {contact.address.zip}</h4>}
                        {props.itemIsExpanded[contact._id] && <h4 className="contact-card-item-relationship">Relationship: {contact.relationship}</h4>}
                        {props.itemIsExpanded[contact._id] ? 
                            <FontAwesomeIcon
                            className="contact-card-expand"
                            icon="angle-double-up"
                            size="2x"
                            id={contact._id}
                            name="contact"
                            onClick={(e)=>props.expand(e)}
                            />
                            
                            :
                            
                            <FontAwesomeIcon
                            className="contact-card-expand"
                            icon="angle-double-down"
                            size="2x"
                            id={contact._id}
                            name="contact"
                            onClick={(e)=>props.expand(e)}
                            />
                        }
                        <FontAwesomeIcon
                        icon="minus-circle"
                        className = "contact-card-delete"
                        size="2x" 
                        onClick={() => props.delete({_id:contact._id, card: props.card, route: props.route})}>
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