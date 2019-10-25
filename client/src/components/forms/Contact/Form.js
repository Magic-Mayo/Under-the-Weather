import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

function ContactInput(props) {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            <h2>Add insurance information</h2>
            <form>
                Emergency Contact Name:<input type="text" name="cName" value={props.name}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Phone Number:<input type="text" name="phone" value={props.phone}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Address:<input type="text" name="address" value={props.address}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Relationship to User:<input type="text" name="relationship" value={props.relationship}
                    onChange={props.handleContactChange}></input>
            </form>
            <button onClick={props.contactToDatabase}>Submit</button>
        </div>
    )
};

export default class Form extends Component {

    state = {
        contact:{
        userId: this.props.userId,
        key: 'data.emergencyContacts',
        route: 'addcontact',
        contacts:{}
        }
    };
    handleContactChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };    
    insuranceToDatabase = () => {
        const contacts = {
            cName: this.state.cName,
            phone: this.state.phone,
            address: this.state.address,
            relationship: this.state.relationship,

        };
        Axios.post('/account/contact', contacts).then(
            data => {
                console.log(data)
                this.setState({ cName: '', phone: '', address: '', relationship: '' })
            }
        )
    }
    
    render() {
        return (
            <div>
                <h1>{this.props.formType}</h1>
                <p>Enter a {this.props.formType}</p>
                <Link to="/dashboard" className="closeForm">
					<button type="button" className="contact-form-close">
						Close Form X
					</button>
				</Link>
            </div>
        )
    };
}
