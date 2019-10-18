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
    if(window.location.pathname.substring(1,10) === 'dashboard'){
        const user = window.location.pathname.split('board/')[1];
        console.log(user)
        return <Loading path={user} loading={props.loading} onClick={props.onClick} onLoad={props.onLoad}/>
    } else {
        return (
            <div>
                <FacebookLogin loading={props.loading} onClick={props.onLoad}/>
                <LogInSignUp loading={props.loading}/>
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
        isLoggedIn: true,
        loading: false,
        user: {
            userName: 'dummy',
            password: 'iisabigdumdum',
            name: 'Dummy McDumberson',
            email: 'dummy@dum.dum',
            DOB: Date.now(),
            gender: 'Male',
            mediData: {
                insurance: [{
                    provider: 'Blue Cross Blue Shield',
                    type: 'Medical',
                    idNumber: '123456',
                    deductible: '5000/7500',
                    copay: [{
                        doctor: 15,
                        specialist: 30,
                        urgentCare: 75,
                        emergency: 200,
                        prescription: {
                            brandName: 15,
                            generic: 2
                        }
                    }],
                    createdAt: Date.now()
                }],
                doctors: [{
                    name: 'Dr. John Smith',
                    type: 'Podiatrist',
                    insuranceKey: '',
                    createdAt: Date.now()
                },{
                    name: 'Dr. Pocahontas',
                    type: 'Pediatrician',
                    insuranceKey: '',
                    createdAt: Date.now()
                }]
            },
            emergencyContacts: [{
                name: 'Smart McDumberson',
                phone: 3365555000,
                address: '123 Oxymoron St Whynot, NC 27340',
                relationship: 'Mother'
            },{
                name: 'Slightly Dumber McDumberson',
                phone: 3365555000,
                address: '123 Oxymoron St Whynot, NC 27340',
                relationship: 'Father'
            },{
                name: 'Normal McNormal',
                phone: 5205552365,
                address: '456 Normal Rd Why, AZ 85789',
                relationship: 'Sister'
            }],
            symptomHistory: [{
                bodyPart: 'Head',
                painType: 'Sharp',
                severity: 'Mild',
                symptoms: 'Headache',
                time: Date.now(),
                diagnosis: '',
                createdAt: Date.now()
            },{
                bodyPart: 'Head',
                painType: 'Pounding',
                severity: 'Severe',
                symptoms: 'Headache',
                time: Date.now(),
                diagnosis: '',
                createdAt: Date.now()
            },{
                bodyPart: 'Stomach',
                painType: 'Nauseous',
                severity: 'Mild',
                symptoms: 'Stomach ache',
                time: Date.now(),
                diagnosis: '',
                createdAt: Date.now()
            },{
                bodyPart: 'Back',
                painType: 'Aching',
                severity: 'Mild',
                symptoms: 'Back ache',
                time: Date.now(),
                diagnosis: '',
                createdAt: Date.now()
            },{
                bodyPart: 'Head',
                painType: 'Sharp',
                severity: 'Mild',
                symptoms: 'Headache',
                time: Date.now(),
                diagnosis: '',
                createdAt: Date.now()
            }],
            emailVerified: false,
            isLoggedIn: true,
            socialMedia: false,
            lastLogin: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        
    };
    
    handleOAuthLogIn = props => {
        Axios.get(`/user/${props}`).then(user=>{
            localStorage.setItem('_underweather', user.data.token);
            this.setState({loading: false, user: user.data, isLoggedIn: true});
        })
    }

    isLoading = () => {
        this.setState({loading: true})
    }

    handleLogOut = user => {
        Axios.put(`/logout/${user}`, false).then(loggedOut=>{
            this.setState({isLoggedIn: loggedOut.data, user: ''});
            window.location.pathname = loggedOut.data.path
            console.log(loggedOut)
        })
    }

    switchLoggedIn = (logged) => {

    this.setState({isLoggedIn: !logged});
    }

  render() {
    // console.log(this.state.bodyParts);

    return (
      <div className="App">
        <Header name={this.state.user.name} user={this.state.user._id} isLoggedIn={this.state.isLoggedIn} loading={this.state.loading} handleLogOut={this.handleLogOut}/>
        <Main isLoggedIn={this.state.loading} onLoad={this.isLoading} onClick={this.handleOAuthLogIn} loading={this.state.loading}/>
        {this.state.isLoggedIn && <Dashboard user={this.state.user} menu={this.state.menu}/>}
      </div>
    )
  }
}

export default App;