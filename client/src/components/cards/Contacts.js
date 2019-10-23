import React, { Component } from 'react';

export default class ContactsCard extends Component {
    state = {
        userContacts: []
    }
  
    render() {
        return (
            <div>
                <section>
                    {this.props.user.emergencyContacts.map((res) => (
                        <Contacts
                            name={res.name}
                        />

                    ))};
            </section>
            </div>

        )
    };

};

function Contacts(props) {
    return (
        <div className="Contacts card">
            <h2>Emergency Contacts</h2>
            <h4>Name: {props.name}</h4>
            <h4>Phone Number: {props.number}</h4>
            <h4>Address: {props.address}</h4>
            <h4>Relatonship: {props.relationship}</h4>
        </div>
    )
}
