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

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown);

function Main(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <Dashboard state={props.state} />;
  } else {
    return <LogInSignUp state={props.state} />;
  }
}



class App extends Component {
  state = {
    bodyParts,

    menu: {
      isExpanded: false
    },
    isLoggedIn: false
  };

  handleHTTP = props => {
    console.log("THIS IS THE LOGIN STATUS BEFORE SIGNING IN", props);

    this.switchLoggedIn(props)

    console.log("THIS IS THE LOGIN STATUS AFTER SIGNING IN", this.state.isLoggedIn);

  };

  switchLoggedIn = (logged) => {

    this.setState({isLoggedIn: !logged});
  }



  render() {
    // console.log(this.state.bodyParts);

    return (
      <div className="App">
<<<<<<< HEAD
        <Header name="Sean" isLoggedIn={this.state.user.isLoggedIn}/>
        <Main state={this.state} isLoggedIn={this.state.user.isLoggedIn}/>
=======
        <Header name="Sean" isLoggedIn={this.state.isLoggedIn} handleHTTP={this.handleHTTP}/>
        <Main state={this.state} isLoggedIn={this.state.isLoggedIn} />
>>>>>>> sean
      </div>
    );
  }
}

export default App;