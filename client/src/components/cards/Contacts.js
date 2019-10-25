import React, { Component } from 'react';

export default class ContactsCard extends Component {
    state = {
        userContacts: []
    }

    render() {
        return (
            <div className="Contacts card">
            <h2>Emergency Contacts</h2>
            {this.props.user.emergencyContacts.map((res) => (
                <EmerContacts
                    name={res.name}
                    number={res.phone}
                    address={res.address.streetAddress}
                    city={res.address.city}
                    state={res.address.state}
                    zip={res.address.zip}
                    relationship={res.relationship}
                />
            ))}

        </div>

        )
    };

};


function EmerContacts(props) {
    return (
        <div>
            <h4>Name: {props.name}</h4>
            <h4>Phone Number: {props.number}</h4>
            <h4>Address: {props.address}</h4>
            <h4>&ensp;{props.city}, {props.state, props.zip} </h4>
            <h4>Relatonship: {props.relationship}</h4>
            <br></br>
        </div>
    )
}
