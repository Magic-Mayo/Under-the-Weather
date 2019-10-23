import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import API from "../utils/API";
import symptoms from "../symptoms.json";

class Symptoms extends Component {
    // Setting component's initial state
    state = {
        symptoms,
        users: [],
        symptomsValue: ""
    };


    // When the component mounts, load all users and save them to this.state.users
    componentDidMount() {
        this.loadUsers();
    }

    // Loads all users and sets them to this.state.users
    loadUsers = () => {
        API.getUsers()
            .then(res => {console.log(res.data); console.log("HELLO!!");
                this.setState({ users: res.data })
            })
            .catch(err => console.log(err));
    };


    // Handles updating component state when the user types into the input field
    handleChange = event => {
        this.setState({ 
            symptomsValue: event.target.value
     });
        console.log(event.target.value)
    };


    // When the form is submitted, use the API.saveUser method to save the user data
    // Then reload books from the database
    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.symptomsValue);
        console.log(this.state.users[0]._id);

        // set state to reflect the new symptoms in the user - push new symptom 
        // once we pushed new symptom, submit the whole edited user to the db. 
            API.updateUser({
                id: this.state.users[0]._id,
                symptomHistory: [{
                    symptomsValue: this.state.symptomsValue
                }]
            })
               .then(res => this.loadUsers())
                .catch(err => console.log(err))
        };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select Symptom</Form.Label>
                        <Form.Control as="select" value={this.state.symptomsValue} onChange={this.handleChange}>
                            <option></option>
                            {this.state.symptoms.map(symptoms => (
                                <option id={symptoms.ID}
                                key={symptoms.ID}> {symptoms.Name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Submit">
                        Submit
                </Button>
                </Form>
                <ListGroup>
                    {this.state.users.map(user => {
                        return (
                            <ListGroup.Item key={user._id}>
                                <a href={"/users/" + user._id}>
                                    <strong>
                                        {user.name}
                                    </strong>
                                </a>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Container>
        );
    }
}


export default Symptoms;