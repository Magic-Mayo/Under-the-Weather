import React from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Providers(props) {
    if(props.providers.length > 0){
        return (
            <div className="Providers card">
                <h2>Medical Providers</h2>
                {props.providers.map(doc=>{
                return (<div key={doc._id} className="provider-wrapper">
                    <h4 className="provider-name">{doc.name}</h4>
                    {doc.doctorType && <p className="provider-title">{doc.doctorType}</p>}
                    {doc.phone && <p className="provider-phone">Phone: {doc.phone}</p>}
                    {doc.email && <p className="provider-email">Email: {doc.email}</p>}
                    <FontAwesomeIcon icon="minus-circle" className = "provider-delete" size="2x" 
                        onClick={() => props.delete({_id:doc._id, card:props.card, route:props.route})}>
                    </FontAwesomeIcon> 
                </div>)
                })}
            </div>
        );
    }

    return (
        <div className="Providers card">
            <h2>Medical Providers</h2>
            <Link to={'/provider'} className="provider-card-link" style={{textDecoration: "none"}}>
                <div className="provider-card-link-container">
                    <p className="provider-card-link-add">Click here to add Medical Providers!</p>
                </div>
            </Link>
        </div>
    )
}