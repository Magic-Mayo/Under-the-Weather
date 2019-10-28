import React, { Component } from "react";
import Symptoms from "../cards/Symptoms";
import MedicalHistory from "../cards/MedicalHistory";
import Providers from "../cards/Providers";
import Contacts from "../cards/Contacts";
import Insurance from "../cards/Insurance";
import Nav from "../Nav";
import Axios from 'axios';

export default class Dashboard extends Component{

  deleteObject = props=> {   
    Axios.delete(`/account/${props.card}/${props.route}/${this.props.userId}/${props._id}`).then(user=>{
        this.props.setUser(user.data);
    })    
  };
  render() {

    // console.log("HERE ARE THE USER DETAILS", this.props.user)
    console.log("DASHBOARD HAS THESE PROPS", this.props);   
    return (
      <div className="Dashboard">
        <Symptoms
        name={this.props.user.name}
        symptoms={this.props.user.symptomHistory}
        card='symptom'
        deleteObject={this.deleteObject}
        route='deletesymptom'
        _id={this.props._id}
        setUser={this.props.setUser}
        userId={this.props.userId}
        isLoggedIn={this.props.isLoggedIn}
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
            deleteObject={this.deleteObject}
            card='provider'
            route='deleteprovider'
            _id={this.props._id}
            setUser={this.props.setUser}
            userId={this.props.userId}
            isLoggedIn={this.props.isLoggedIn}
            />
            <Contacts
            setUser={this.props.setUser}
            userId={this.props.userId}
            isLoggedIn={this.props.isLoggedIn}
            name={this.props.user.name}
            contact={this.props.user.emergencyContacts}            
            deleteObject={this.deleteObject}
            card ='contact'
            route='deletecontact'
            _id={this.props._id}                    
            />
            <Insurance
            setUser={this.props.setUser}
            userId={this.props.userId}
            isLoggedIn={this.props.isLoggedIn}
            name={this.props.user.name}
            insurance={this.props.user.mediData.insurance}
            deleteObject={this.deleteObject}           
            card='insurance'
            route='deleteinsurance'
            _id={this.props._id}  
            />
        </section>
        <Nav
          name={this.props.user.name}
          menu={this.props.menu}
          isLoggedIn={this.props.isLoggedIn}
          formOpen={this.props.formOpen}
          toggleForm={this.props.toggleForm}
          userId={this.props.userId}
          user={this.props.user}
          setUser={this.props.setUser}
        />
        {/* <Forms /> */}
      </div>
    );
  }
}



