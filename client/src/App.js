import React, { Component } from 'react';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard'
import FormContainer from './components/pages/FormContainer'
// import Loading from './components/icons/loading'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from '@fortawesome/free-brands-svg-icons'

import {
  faAngleDown,
  faPlus,
  faEnvelope,
  faPhone,
  faFilter,
  faSortDown,
//   faChild,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import bodyParts from "./data/bodyParts.json";
import "./App.scss";
import axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown, faEye, faEyeSlash, fab);

class App extends Component {
    state = {
        bodyParts,
        
        menu: {
            isExpanded: false
        },
        isLoggedIn: false,
        loading: false,
        pathname: window.location.pathname,
        formOpen: false,
        user: false
    };

    componentDidMount(){        
        if(window.location.pathname.substring(1,11) === 'dashboard/' && !this.state.isLoggedIn){
            const user = window.location.pathname.split('board/')[1];
            return this.handleLogIn(user);
        }
    }

    handleLogIn = props => {
        this.setState({loading: true})
        return axios.post(`/login`, props)
            .then(user=>{
                this.setState({loading: false, user: user.data.user, userId: user.data.userId, isLoggedIn: true})
                localStorage.setItem('_underweather', user.data.loginToken);
                window.history.pushState(null, '', '/dashboard')
            })
    }

    logIn = () => {
        this.setState({isLoggedIn: true})
    }

    setUser = props => {
        this.setState(props)
    }

    handleLogOut = () => {
        this.setState({loading: true})
        axios.put(`/logout/${this.state.userId}`, {loggedIn: 'logout'}).then(loggedOut=>{
            localStorage.removeItem('_underweather')
            this.setState({isLoggedIn: loggedOut.data.loggedOut, user: '', userId: '', loading: false});
            window.history.pushState(null, '',loggedOut.data.path)
        })
    }

    logTarget = (e) => {
        console.log(e.target);

        if ((e.target.className !== 'form-container') && (this.state.formOpen)) {
            window.location.pathname = this.state.pathname
        }
    }

    toggleForm = (e) => {
        this.setState({
            formOpen: !this.state.formOpen
        })
    }
    
    render() {
        return (
            <div className="App">
                <Header name={this.state.user.name} isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>
                {!this.state.isLoggedIn && !this.state.user ? 
                <FormContainer setUser={this.setUser} loading={this.state.loading} handleLogIn={this.handleLogIn} isLoading={this.isLoading}/>:
                <Dashboard user={this.state.user} menu={this.state.menu} toggleForm={this.toggleForm} formOpen={this.state.formOpen}/>}
            </div>
        )
    }
}

export default App;