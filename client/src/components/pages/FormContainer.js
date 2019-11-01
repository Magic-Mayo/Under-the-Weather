import React, { Component } from 'react';
import EntranceForm from '../Login/EntranceForm';
import ProviderForm from '../Provider/Form'
import SymptomForm from '../Symptom/Form'
import ContactForm from '../Contact/Form'
import InsuranceForm from '../Insurance/Form'
import ProviderManualEntry from '../Provider/ManualEntry';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class FormContainer extends Component {
	componentDidMount() {
        if(this.props.menuState){
            this.props.toggleMenu()
        }
    }

	togglePassword = () => {
		this.setState({
			showPassword: !this.state.showPassword
		});
    };
    
    setUpdateData = data => {
        this.setState({data: data})
    }

	render() {
        console.log(this.props.match.params.formtype)
        return (
			<div className="FormContainer">
                    {this.props.formOpen && this.props.match.params &&
                        <Link to="/dashboard" className="form-container-close" title="Close Form">
                                X
                        </Link>
                    }
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
                            message={this.props.message}
                            setSignUp={this.setSignUp}
                            setLogIn={this.setLogIn}
                            setUser={this.props.setUser}
                            isLoggedIn={this.props.isLoggedIn}
                            logInNewUser={this.props.logIn}
                            userId={this.props.userId}
                        />
					}
			</div>
		);
	}
}

export default withRouter(FormContainer);