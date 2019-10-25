import React, { Component } from 'react';
import Axios from 'axios';
export default class Form extends Component {
    state = {      
        userId: this.props.userId,
        name:'',
        phone:'',
        address:'',
        relationship:''      
    };
    handleContactChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };    
    submitContact = () => {
        const contacts = {
            userId: this.state.userId,
            route: 'addcontact',
            contact: {
            name: this.state.name || '',
            phone: this.state.phone || '',
            address: this.state.address || '',
            relationship: this.state.relationship || ''
            }

        };
        Axios.post('/account/contact', contacts).then(
            contact=> {
                this.props.getNewUserInfo(this.props.userId)                
                this.setState({ name: '', phone: '', address: '', relationship: '' })
            }
        )
    };

    render() {
        return (
            <div>			
            <ContactInput 
            name={this.props.name}
            name={this.state.name}
            phone={this.state.phone}
            address={this.state.address}
            relationship={this.state.relationship}			
            handleContactChange={this.handleContactChange}
            submitContact={this.submitContact}
            />			
            </div>
        );
    };
}

function ContactInput(props) {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            <h2>Add insurance information</h2>
            <form>
                Emergency Contact Name:<input type="text" name="name" value={props.name}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Phone Number:<input type="text" name="phone" value={props.phone}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Address:<input type="text" name="address" value={props.address}
                    onChange={props.handleContactChange}></input>
                Emergency Contact Relationship to User:<input type="text" name="relationship" value={props.relationship}
                    onChange={props.handleContactChange}></input>              
            </form>
            <button onClick={props.submitContact}>Submit</button>
        </div>
    )
};

