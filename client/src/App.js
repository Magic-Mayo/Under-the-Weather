import React, { Component } from 'react';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import FormContainer from './components/pages/FormContainer'
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
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import bodyParts from "./data/bodyParts.json";
import "./App.scss";
import axios from 'axios';
import Axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown, faEye, faEyeSlash, fab);

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

    componentDidMount() {
        if(window.location.pathname.substring(1,10) === 'dashboard' && !this.state.isLoggedIn){
            const user = window.location.pathname.split('board/')[1];
            return <Loading user={user} handleLogIn={this.handleLogIn} loading={this.state.loading}/>
        } else {
            return (
                <div>
                    <FormContainer loading={this.state.loading} handleLogIn={this.handleLogIn}/>
                </div>
            )
        }
    }

    handleLogIn = props => {
        console.log(props)
        this.setState({loading: true})
        if (typeof props === 'object'){
            return axios.post(`/login`, props)
            .then(user=>{
                console.log(user)
                this.setState({loading: false, user: user.data, isLoggedIn: true})
                localStorage.setItem('_underweather', user.data.token);
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
        axios.put(`/logout/${this.state.user._id}`, {loggedIn: 'logout'}).then(loggedOut=>{
            localStorage.removeItem('_underweather')
            this.setState({isLoggedIn: loggedOut.data.loggedOut, user: '', loading: false});
            window.location.pathname = loggedOut.data.path
        })
    }

    
    render() {
        return (
            <div className="App">
                <Header name={this.state.user.name} user={this.state.user._id} isLoggedIn={this.state.isLoggedIn} loading={this.state.loading} handleLogOut={this.handleLogOut}/>
                {!this.state.isLoggedIn && !this.state.user ? 
                <FormContainer loading={this.state.loading} handleLogIn={this.handleLogIn}/>:
                <Dashboard user={this.state.user} menu={this.state.menu}/>}
                {/* <Main isLoggedIn={this.state.loading} logIn={this.logIn} onLoad={this.isLoading} handleLogIn={this.handleLogIn} loading={this.state.loading}/>: */}
            </div>
        )
    }
}

export default App;