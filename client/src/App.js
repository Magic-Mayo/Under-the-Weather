import React, { Component }from 'react';
// import ReactDOM from 'react-dom'
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import LogInSignUp from './components/pages/LogInSignUp'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown } from '@fortawesome/free-solid-svg-icons'

import bodyParts from './data/bodyParts.json'

import './App.scss';
import { userInfo } from 'os';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown)

function Main(props) {
      const isLoggedIn = props.isLoggedIn

      if (isLoggedIn) {
        return <Dashboard state={props.state} />
      } else {
        return <LogInSignUp state={props.state} />
      }
}

 class App extends Component {
   state = {
     bodyParts,

     menu: {
       isExpanded: false
     },

     user: {
       isLoggedIn: false
     }
   }

  render() {
    console.log(this.state.bodyParts);

    return (
      <div className="App">
        <Header name="Sean" isLoggedIn={this.state.isLoggedIn}/>
        <Main state={this.state} isLoggedIn={this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
