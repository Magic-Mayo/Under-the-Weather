import React, { Component }from 'react';
// import ReactDOM from 'react-dom'
import Header from './components/Header';
import Symptoms from './components/cards/Symptoms';
import MedicalHistory from './components/cards/MedicalHistory';
import Providers from './components/cards/Providers';
import Contacts from './components/cards/Contacts';
import Insurance from './components/cards/Insurance';
import Nav from './components/Nav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown } from '@fortawesome/free-solid-svg-icons'

import bodyParts from './data/bodyParts.json'

import './App.scss';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown)

 class App extends Component {
   state = {
     bodyParts,

     menu: {
       isExpanded: false
     }
   }

  render() {
    console.log(this.state.bodyParts);

    return (
      <div className="App">
        <Header name="Sean" />
        <Symptoms name="Sean" />
        <section className="container-right">
          <MedicalHistory name="Sean"/>
          <Providers name="Sean"/>
          <Contacts name="Sean"/>
          <Insurance name="Sean"/>
        </section>
        <Nav name="Sean" menu={this.state.menu}/>
      </div>
    );
  }
}

export default App;
