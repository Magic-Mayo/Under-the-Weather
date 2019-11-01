import React, { Component } from "react";
import Symptoms from "../Symptom/Card";
// import MedicalHistory from "../Medical_History/MedicalHistory";
import Providers from "../Provider/Card";
import Contacts from "../Contact/Card";
import Insurance from "../Insurance/Card";
import FormContainer from './FormContainer'
import Nav from "../Nav";
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class Dashboard extends Component{
    state = {}

    componentDidMount(){
        console.log('mounted')
        if(this.props.location.state !== undefined && this.props.location.state.isLoggedIn){
            console.log('not log')
            this.props.logIn();
        }
    }

    // change function to set state based on which component it comes from as well
    expand = e => {
        const {id} = e.currentTarget;
        this.setState({[id]: !this.state[id]})
    }

    deleteObject = props => {   
        Axios.delete(`/account/${props.card}/${props.route}/${this.props.userId}/${props._id}`).then(user=>{
            this.props.setUser(user.data);
        })
    }

    editObject = props => {
        window.location.pathname = props
    }

    render() {
        if(!this.props.isLoggedIn){
            return <Redirect to="/"/>
        }
        return (
            <div className="Dashboard">
            <Symptoms
            name={this.props.user.name}
            symptoms={this.props.user.symptomHistory}
            card='symptom'
            delete={this.deleteObject}
            route='deletesymptom'
            edit={this.editObject}
            expand={this.expand}
            itemIsExpanded={this.state}
            />
            
            <section className="container-right">
                {/* Future use

                <MedicalHistory
                name={this.props.name}
                user={this.props.user}
                /> */}

                <Providers
                name={this.props.user.name}
                providers={this.props.user.mediData.doctors}
                delete={this.deleteObject}
                card='provider'
                route='deleteprovider'
                edit={this.editObject}
                expand={this.expand}
                itemIsExpanded={this.state}
                />
                <Contacts
                name={this.props.user.name}
                contact={this.props.user.emergencyContacts}            
                delete={this.deleteObject}
                edit={this.editObject}
                expand={this.expand}
                itemIsExpanded={this.state}
                card ='contact'
                route='deletecontact'
                />
                <Insurance
                name={this.props.user.name}
                insurance={this.props.user.mediData.insurance}
                delete={this.deleteObject}
                edit={this.editObject}
                expand={this.expand}
                itemIsExpanded={this.state}
                card='insurance'
                route='deleteinsurance'
                />
            </section>
            <Nav
                name={this.props.user.name}
                menu={this.props.menu}
                formOpen={this.props.formOpen}
                toggleForm={this.props.toggleForm}
                userId={this.props.userId}
                user={this.props.user}
                isLoggedIn={this.props.isLoggedIn}
            />
            {/* <Forms /> */}
            <Route
            path={`${this.props.match.path}/form/:formtype/:id?`}
            >
                <FormContainer
                userId={this.state.userId}
                setUser={this.state.setUser}
                user={this.state.user}
                handleLogIn={this.handleLogIn}
                logIn={this.logIn}
                searchOrManual="entry"
                isLoggedIn={this.props.isLoggedIn}
                />
            </Route>

            </div>
        );
    }
}

export default withRouter(Dashboard)