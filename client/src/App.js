import React from 'react';
// import ReactDOM from 'react-dom'
import Header from './components/Header';
import Symptoms from './components/cards/Symptoms';
import Providers from './components/cards/Providers';
import Contacts from './components/cards/Contacts';
import Insurance from './components/cards/Insurance';
import Nav from './components/Nav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faPlus, faEnvelope, faPhone, faFilter } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter)

function App() {
  return (
    <div className="App">
      <Header name="Sean" />
      <Symptoms name="Sean" />
      <section className="container-right">
        <Providers name="Sean"/>
        <Contacts name="Sean"/>
        <Insurance name="Sean"/>
      </section>
      <Nav name="Sean"/>
    </div>
  );
}

export default App;
