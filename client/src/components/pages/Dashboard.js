import React, { Component } from "react";
import Symptoms from "../cards/Symptoms";
import MedicalHistory from "../cards/MedicalHistory";
import Providers from "../cards/Providers";
import Contacts from "../cards/Contacts";
import Insurance from "../cards/Insurance";
import Nav from "../Nav";

export default class Dashboard extends Component {
  render() {
    console.log(this.props.user.DOB);
    return (
      <div className="Dashboard">
        <Symptoms name={this.props.name} symptoms={this.props.symptomHistory}/>
        <section className="container-right">
          <MedicalHistory name="Sean"/>
          <Providers name="Sean"/>
          <Contacts name="Sean"/>
          <Insurance name="Sean"/>
        </section>
        <Nav name="Sean" menu={this.props.menu}/>
        {/* <Forms /> */}
      </div>
    );
  }
}
