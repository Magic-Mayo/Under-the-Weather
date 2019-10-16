import React, { Component } from 'react';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import LogInSignUp from './components/pages/LogInSignUp'

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faPlus,
  faEnvelope,
  faPhone,
  faFilter,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";

import bodyParts from "./data/bodyParts.json";

import "./App.scss";
import Axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown);

function Main(state) {
if(window.location.pathname.substring(1,8)==='loading'){

    const user = window.location.pathname.split('ing/')[1]
    console.log(user)
    Axios.get(`/user/${user}`).then(user=>{
        console.log(user)
        return <Dashboard {...user}/>
    })
    return <LogInSignUp state={state}/>
} else {
        return <LogInSignUp state={state}/>
}
}


class App extends Component {
    state = {
        bodyParts,
        
        menu: {
            isExpanded: false
        },
        isLoggedIn: false,
        loading: false,
        user: ''
    };
    
    handleHTTP = props => {
        this.setState({loading: true})
    }

    switchLoggedIn = (logged) => {

    this.setState({isLoggedIn: !logged});
    }



  render() {
    // console.log(this.state.bodyParts);

    return (
      <div className="App">
        <Header name="Sean" isLoggedIn={this.state.isLoggedIn} handleHTTP={this.handleHTTP} loading={this.state.loading}/>
        <Main state={this.state}/>
      </div>
    )
  }
}

export default App;