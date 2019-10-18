import React, { Component } from 'react';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import LogInSignUp from './components/pages/LogInSignUp'
import Loading from './components/icons/loading'



import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faPlus,
  faEnvelope,
  faPhone,
  faFilter,
  faSortDown,
  faChild 
} from "@fortawesome/free-solid-svg-icons";

import bodyParts from "./data/bodyParts.json";

import "./App.scss";
import Axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown);

const FacebookLogin = (props) => {
    return !props.isLoggedIn && <a className="header-status" href='http://localhost:3001/auth/facebook' onClick={props.onClick}>Sign In With Facebook</a>
};

function Main(props) {
    if(window.location.pathname.substring(1,8)==='dahsboard'){
        const user = window.location.pathname.split('ing/')[1];
        return <Loading path={user} loading={props.state.loading} onClick={props.onClick} onLoad={props.onLoad}/>
    } else {
        return (
            <div>
                <FacebookLogin isLoggedIn={props.state.isLoggedIn}/>
                <LogInSignUp state={props}/>
            </div>
        )
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
        Axios.get(`/user/${props}`).then(user=>{
            this.setState({loading: false, user: user.data})
            console.log(user)
        })
    }

    isLoading = () => {
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
        <Main state={this.state} onLoad={this.isLoading} onClick={this.handleHTTP}/>
      </div>
    )
  }
}

export default App;