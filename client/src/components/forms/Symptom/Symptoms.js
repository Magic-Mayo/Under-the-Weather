import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import symptoms from "./symptoms.json";
import API from '../../../utils/SymptomAPI'

class Symptoms extends Component {
    // Setting component's initial state
    state = {
        symptoms
    };
    render() {
        return (
            <Container>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select Symptom</Form.Label>
                        <Form.Control as="select" value={this.state.symptomsValue} onChange={this.props.handleChange}>
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
                {/* CHANGE THIS TO USER INSTEAD OF USERS */}
                {/* <ListGroup>
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
                </ListGroup> */}
            </Container>
        );
    }
}


export default Symptoms;