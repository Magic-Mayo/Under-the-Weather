import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import 'simplebar';
// import 'simplebar/dist/simplebar.min.css';
// import 'simplebar/dist/simplebar.min.js';


export default function ContactsCard(props) {
    if(props.contact.length > 0){
        return (
            <div className="contact-card card"  data-simplebar>
                <div style={{width: "100%"}}>
                <h2>Emergency Contacts</h2>
                {props.contact.map(contact => (
                    <div key={contact._id} className="contact-card-item card">                
                        <h4 className="contact-card-item-name">{contact.name}</h4>

                        {contact.relationship &&
                            <h5 className="contact-card-item-relationship">{contact.relationship}</h5>}

                        {props.itemIsExpanded[contact._id] &&
                            <hr style={{width: "75%"}}></hr>
                        }

                        {props.itemIsExpanded[contact._id] && contact.phone &&
                            <h4 className="contact-card-item-phone">Phone: {contact.phone}</h4>
                        }

                        {props.itemIsExpanded[contact._id] && contact.address.streetAddress &&
                            <h5 className="contact-card-item-address">Address: {contact.address.streetAddress}</h5>}

                        {props.itemIsExpanded[contact._id] && contact.address.city &&
                            <h5 className="contact-card-item-city">{' '}{contact.address.city}, {contact.address.state} {contact.address.zip}</h5>}
 
                        <FontAwesomeIcon
                        className="contact-card-expand item-expand item"
                        icon={props.itemIsExpanded[contact._id] ? "angle-double-up" : "angle-double-down"}
                        size="2x"
                        id={contact._id}
                        onClick={(e)=>props.expand(e)}
                        />
                        <span className="delete-icon-provider-wrapper">
                            <FontAwesomeIcon
                                icon="minus"
                                className="delete-icon-provider"
                                size="1x"
                                onClick={() => props.delete({ _id: contact._id, card: props.card, route: props.route })}>
                            </FontAwesomeIcon>
                        </span>                        <Link
                        to={{pathname: `dashboard/form/contact/${contact._id}`,
                            state: {update: true, contact}}}
                        className="contact-result-edit">
                            <FontAwesomeIcon
                            icon="edit"
                            className="edit-icon edit-icon-contact"
                            size="2x" 
                            />
                        </Link>
                        <br/>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className="contact-card contact-card-empty card">
            <h2>Emergency Contacts</h2>
            <Link to={{pathname:'/dashboard/form/contact', state: {add: true}}} className="contact-card-link" style={{textDecoration: "none"}}>
                <div className="contact-card-link-container">
                    <p className="contact-card-link-add">Click here to add Emergency Contacts!</p>
                </div>
            </Link>
        </div>
    )
}