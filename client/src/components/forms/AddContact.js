import React, { Component } from 'react'
import LogInSignUp from '../pages/LogInSignUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

export default class AddContact extends Component {
    render() {
        return (
            <div className="AddContact">
                {/* <Container>
                    <Form>
                        <Form.Label>

                        </Form.Label>
                    </Form>
                </Container> */}
                ADD CONTACT
                <LogInSignUp message="ADD CONTACT"/>


            </div>
        )
    }
}
