import React, { Component } from 'react';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import LogInSignUp from './components/pages/LogInSignUp'
import Loading from './components/icons/loading'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from '@fortawesome/free-brands-svg-icons'

import {
  faAngleDown,
  faPlus,
  faEnvelope,
  faPhone,
  faFilter,
  faSortDown,
  faChild,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import bodyParts from "./data/bodyParts.json";
import "./App.scss";
import axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown,fab, faEye);

const UTWtoken = localStorage.getItem('_underweather');
if (UTWtoken){
    axios.post('/token', {token: UTWtoken}).then(user=>{
        console.log(user)
        if(user){
            return window.location.pathname = `dashboard/${user}`
        }
    }).catch(err=>console.log(err))
}

const Main = props => {
    console.log(props)
    if(window.location.pathname.substring(1,10) === 'dashboard' && !props.isLoggedIn){
        props.logIn();
        const user = window.location.pathname.split('board/')[1];
        return <Loading path={user} loading={props.loading} onClick={props.handleLogIn} onLoad={props.onLoad}/>
    } else {
        return (
            <div>
                {props.loading ? 
                <Loading loading={props.loading} path={props.user} onLoad={props.onLoad} handleLogIn={props.handleLogIn}/>:
                <LogInSignUp loading={props.loading} handleLogIn={props.handleLogIn}/>}
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
        user: false
    };
    
    handleLogIn = props => {
        this.setState({loading: true})
        if (typeof props === 'object'){
            return axios.post(`/login`, props)
            .then(user=>{
                this.setState({loading: false, user: user.data, isLoggedIn: true})
                localStorage.setItem('_underweather', user.token);
            })
        }

        axios.get(`/user/${props}`).then(user=>{
            window.location.pathname = '/dashboard';
            localStorage.setItem('_underweather', user.data.token);
            this.setState({loading: false, user: user.data, isLoggedIn: true});
        })
    }

    isLoading = () => {
        this.setState({loading: true})
    }

    logIn = () => {
        this.setState({isLoggedIn: true})
    }

    handleLogOut = () => {
        this.setState({loading: true})
        console.log('clicked')
        axios.put(`/logout/${this.state.user._id}`, {loggedIn: 'logout'}).then(loggedOut=>{
            localStorage.removeItem('_underweather')
            this.setState({isLoggedIn: loggedOut.data, user: '', loading: false});
            window.location.pathname = loggedOut.data.path
            console.log(loggedOut)
        })
    }

    
    render() {
        console.log(this.state)
        return (
            <div className="App">
                <Header name={this.state.user.name} user={this.state.user._id} isLoggedIn={this.state.isLoggedIn} loading={this.state.loading} handleLogOut={this.handleLogOut}/>
                {!this.state.isLoggedIn && !this.state.user ? 
                <Main isLoggedIn={this.state.loading} logIn={this.logIn} onLoad={this.isLoading} handleLogIn={this.handleLogIn} loading={this.state.loading}/>:
                <Dashboard user={this.state.user} menu={this.state.menu}/>}
            </div>
        )
  }
}

export default App;