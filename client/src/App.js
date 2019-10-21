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
import Axios from 'axios';

library.add(faAngleDown, faPlus, faEnvelope, faPhone, faFilter, faSortDown, faEye, faEyeSlash, fab);

const Main = props => {
    if(window.location.pathname.substring(1,10) === 'dashboard'){
        const user = window.location.pathname.split('board/')[1];
        console.log(user)
        return <Loading path={user} loading={props.loading} onClick={props.handleLogIn} onLoad={props.onLoad}/>
    } else {
        return (
            <div>
                <FormContainer loading={props.loading} handleLogIn={props.handleLogIn} isLoggedIn={props.isLoggedIn}/>
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
        user: '',
        pathname: window.location.pathname,
        formOpen: false
    }

    handleLogIn = props => {
        this.setState({loading: true})
        if (typeof props === 'object'){
            return Axios.post(`/login`, props)
            .then(user=>{
                this.setState({loading: false, user: user.data, isLoggedIn: true})
                localStorage.setItem('_underweather', user.token);
            })
        } 
        Axios.get(`/user/${props}`).then(user=>{
            localStorage.setItem('_underweather', user.data.token);
            this.setState({loading: false, user: user.data, isLoggedIn: true});
        })
    }

    isLoading = () => {
        this.setState({loading: true})
    }

    handleLogOut = () => {
        this.setState({loading: true})
        console.log('clicked')
        Axios.put(`/logout/${this.state.user._id}`, {loggedIn: 'logout'}).then(loggedOut=>{
            localStorage.removeItem('_underweather')
            this.setState({isLoggedIn: loggedOut.data, user: '', loading: false});
            window.location.pathname = loggedOut.data.path
            console.log(loggedOut)
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
      console.log("ARE YOU LOGGED IN???", this.state.loading)
    return (
        <div className="App" onClick={this.logTarget}>
            <Header name={this.state.user.name} user={this.state.user._id} isLoggedIn={this.state.isLoggedIn} loading={this.state.loading} handleLogOut={this.handleLogOut}/>
            {!this.state.isLoggedIn ? 
            <Main isLoggedIn={this.state.isLoggedIn} onLoad={this.isLoading} handleLogIn={this.handleLogIn} loading={this.state.loading}/>:
            <Dashboard user={this.state.user} menu={this.state.menu} isLoggedIn={this.state.isLoggedIn} formOpen={this.state.formOpen} toggleForm={this.toggleForm}/>}
        </div>
    )
  }
}

export default App;