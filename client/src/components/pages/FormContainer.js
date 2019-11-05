import React, { Component } from 'react';
import EntranceForm from '../Login/EntranceForm';
import SymptomForm from '../Symptom/Form'
import ProviderForm from '../Provider/Form'
import ContactForm from '../Contact/Form'
import InsuranceForm from '../Insurance/Form'
import ProviderManualEntry from '../Provider/ManualEntry';
import { Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class FormContainer extends Component {
    state = {
        loginActive: true,
		signupActive: false,
    }

    toggleSignUporLogIn = () => {
        return this.setState({
            loginActive: !this.state.loginActive, 
            signupActive: !this.state.signupActive
        })
	};

	togglePassword = () => {
		this.setState({
			showPassword: !this.state.showPassword
		});
    };
    
    setUpdateData = data => {
        this.setState({data: data})
    }

	render() {
        return (
			<div className="FormContainer">
                <section className={`form-container ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}>
                {this.props.isLoggedIn &&
                    <Link to="/dashboard" className="form-container-close" title="Close Form">
                            X
                    </Link>}
                {
                    this.props.match.params.formtype === 'contact' ? (
                        <ContactForm {...this.props}/>
                    ) : this.props.match.params.formtype === 'provider' ? (
                        <ProviderForm {...this.props}/>
                    ) : this.props.match.params.formtype === 'symptom' ? (
                        <SymptomForm {...this.props}/>
                    ) : this.props.match.params.formtype === 'insurance' ? (
                        <InsuranceForm {...this.props}/>
                    ) : this.props.match.params.formtype === 'manual' ? (
                        <ProviderManualEntry {...this.props}/>
                    ) 
                : 
                    <EntranceForm
                        handleLogIn={this.props.handleLogIn}
                        state={this.state}
                        setSignUp={this.setSignUp}
                        setLogIn={this.setLogIn}
                        setUser={this.props.setUser}
                        logInNewUser={this.props.logIn}
                        userId={this.props.userId}
                        loginActive={this.state}
                        toggleSignUporLogIn={this.toggleSignUporLogIn}
                        error={this.props.error}
                    />
                }
                </section>
			</div>
		);
	}
}

export default withRouter(FormContainer);