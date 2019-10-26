import React, { Component } from "react";
import Symptoms from "../cards/Symptoms";
import MedicalHistory from "../cards/MedicalHistory";
import Providers from "../cards/Providers";
import Contacts from "../cards/Contacts";
import Insurance from "../cards/Insurance";
import Nav from "../Nav";

export default class Dashboard extends Component {
  render() {
    // console.log("HERE ARE THE USER DETAILS", this.props.user)
		// console.log("DASHBOARD HAS THESE PROPS", this.props);    
    return (
      <div className="Dashboard">
        <Symptoms
        name={this.props.name}
        symptoms={this.props.user.symptomHistory}/>
        <section className="container-right">
            {/* Future use

            <MedicalHistory
            name={this.props.name}
            user={this.props.user}
            /> */}

            <Providers
            name={this.props.name}
            providers={this.props.user.mediData.doctors}
            />
            <Contacts
            name={this.props.name}
            contacts={this.props.user.emergencyContacts}
            />
            <Insurance
            name={this.props.name}
            insurance={this.props.user.mediData.insurance}
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
