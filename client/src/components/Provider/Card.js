import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Providers(props) {
    if (props.providers.length > 0) {
        return (
            <div className="Providers card">
                <h2>Medical Providers</h2>
                {props.providers.map(provider => {
                    return (
                        <div key={provider._id} className="provider-item card">
                            <h4 className="provider-item-name">{provider.name}
                                <span>
                                    <FontAwesomeIcon
                                        icon="minus-circle"
                                        className="insurance-delete"
                                        size="1x"
                                        onClick={() => props.delete({ _id: provider._id, card: props.card, route: props.route })}>
                                    </FontAwesomeIcon>
                                </span>
                            </h4>

                            {provider.doctorType &&
                                <h5 className="provider-item-title">{provider.doctorType}</h5>}

                            {provider.phone && props.itemIsExpanded[provider._id] &&
                                <h5 className="provider-item-phone">Phone: {provider.phone}</h5>}

                            {provider.email && props.itemIsExpanded[provider._id] &&
                                <h5 className="provider-item-email">Email: {provider.email}</h5>}

                            <FontAwesomeIcon
                                className="provider-item-expand item-expand item"
                                icon={props.itemIsExpanded[provider._id] ? "angle-double-up" : "angle-double-down"}
                                size="2x"
                                id={provider._id}
                                onClick={(e) => props.expand(e)}
                            />
                            <Link to={{ pathname: `dashboard/form/provider/${provider._id}`, state: { provider, entry: true } }}>
                                <FontAwesomeIcon
                                    icon="edit"
                                    className="provider-card-edit item-edit item"
                                    size="2x"
                                />
                            </Link>
                        </div>)
                })}
            </div>
        );
    }

    return (
        <div className="Providers card">
            <h2>Medical Providers</h2>
            <Link to={{ pathname: '/dashboard/form/provider', state: { entry: true } }} className="provider-card-link" style={{ textDecoration: "none" }}>
                <div className="provider-card-link-container">
                    <p className="provider-card-link-add">Click here to add Medical Providers!</p>
                </div>
            </Link>
        </div>
    )
}