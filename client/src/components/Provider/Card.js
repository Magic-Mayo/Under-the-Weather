import React from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Providers(props) {
    if(props.providers.length > 0){
        return (
            <div className="Providers card">
                <h2>Medical Providers</h2>
                {props.providers.map(provider=>{
                return (<div key={provider._id} className="provider-wrapper">
                    <h4 className="provider-name">{provider.name}</h4>
                    
                    {provider.doctorType && props.itemIsExpanded[provider._id] &&
                        <p className="provider-title">{provider.doctorType}</p>}

                    {provider.phone && props.itemIsExpanded[provider._id] &&
                        <p className="provider-phone">Phone: {provider.phone}</p>}

                    {provider.email && props.itemIsExpanded[provider._id] &&
                        <p className="provider-email">Email: {provider.email}</p>}

                    {props.itemIsExpanded[provider._id] ? 
                        <FontAwesomeIcon
                        className="provider-card-expand"
                        icon="angle-double-up"
                        size="2x"
                        id={provider._id}
                        onClick={(e)=>props.expand(e)}
                        />
                        
                        :
                        
                        <FontAwesomeIcon
                        className="provider-card-expand"
                        icon="angle-double-down"
                        size="2x"
                        id={provider._id}
                        onClick={(e)=>props.expand(e)}
                        />
                    }
                    <FontAwesomeIcon icon="minus-circle" className = "provider-delete" size="2x" 
                        onClick={() => props.delete({_id:provider._id, card:props.card, route:props.route})}>
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