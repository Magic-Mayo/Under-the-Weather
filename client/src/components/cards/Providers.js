import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Providers extends Component {
    state = {
    }
    expand = e => {
        const { id } = e.currentTarget
        console.log(id)
        this.setState({ [id]: !this.state[id] })
    }

    render() {
        if (this.props.providers.length > 0) {
            return (
                <div className="Providers card">
                    <h2>Medical Providers</h2>
                    {this.props.providers.map(doc => {
                        return (<div key={doc._id} id={doc._id} className="provider-wrapper" onClick={this.expand}>
                            <FontAwesomeIcon icon="minus-circle" className="provider-delete" size="2x"
                                onClick={() => this.props.delete({ _id: doc._id, card: this.props.card, route: this.props.route })}>
                            </FontAwesomeIcon>
                            <h4 className="provider-name">{doc.name}</h4>
                            {this.state[doc._id] && <p className="provider-title">{doc.doctorType}</p>}
                            {this.state[doc._id] && <p className="provider-phone">Phone: {doc.phone}</p>}
                            {this.state[doc._id] && <p className="provider-email">Email: {doc.email}</p>}
                        </div>)
                    })}
                </div>
            );
        }

        return (
            <div className="Providers card">
                <h2>Medical Providers</h2>
<<<<<<< HEAD
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
=======
                <Link to={'/provider'} className="provider-card-link" style={{ textDecoration: "none" }}>
                    <div className="provider-card-link-container">
                        <p className="provider-card-link-add">Click here to add Medical Providers!</p>
                    </div>
                </Link>
>>>>>>> 97629f9eba8c0a7169dec9f9cce964c36f994870
            </div>
        )
    };
}