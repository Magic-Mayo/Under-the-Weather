import React, { Component } from "react";
import Symptoms from "../cards/Symptoms";
import MedicalHistory from "../cards/MedicalHistory";
import Providers from "../cards/Providers";
import Contacts from "../cards/Contacts";
import Insurance from "../cards/Insurance";
import Nav from "../Nav";

export default class Dashboard extends Component {
  state = this.props.state
  render() {
    return (
      <div className="Dashboard">
        <Symptoms name="Sean" />
        <section className="container-right">
          <MedicalHistory name="Sean"/>
          <Providers name="Sean"/>
          <Contacts name="Sean"/>
          <Insurance name="Sean"/>
        </section>
        <Nav name="Sean" menu={this.state.menu}/>
        {/* <Forms /> */}
      </div>
    );
  }
}
