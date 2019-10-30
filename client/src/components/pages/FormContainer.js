import React, { Component } from 'react';
import EntranceForm from '../Login/EntranceForm';
import ProviderForm from '../Provider/Form'
import SymptomForm from '../Symptom/Form'
import ContactForm from '../Contact/Form'
import InsuranceForm from '../Insurance/Form'
import ManualEntry from '../Provider/ManualEntry';
import {Link} from 'react-router-dom';

export default class FormContainer extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0,
        showPassword: false
    };
	setLogIn = () => {
		this.setState({
			loginActive: true,
			signupActive: false,
			showPassword: false
		});
	};

	setSignUp = () => {
		this.setState({
			signupActive: true,
			loginActive: false,
			showPassword: false
		});
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
                        </Link>
                    }
					{!this.props.isLoggedIn && (
						<div className="form-btn-wrapper">
							<button className="form-btn form-btn-signup" onClick={this.setSignUp}>
								Sign Up
							</button>
							<button className="form-btn form-btn-login" onClick={this.setLogIn}>
								Log In
							</button>
						</div>
					)}
					{
						this.props.isLoggedIn ? (
							this.props.formType === 'Contact' ? (
								<ContactForm {...this.props}/>
							) : this.props.formType === 'Provider' ? (
								<ProviderForm {...this.props}/>
							) : this.props.formType === 'Symptom' ? (
								<SymptomForm {...this.props}/>
							) : this.props.formType === 'Insurance' ? (
								<InsuranceForm {...this.props}/>
							) : this.props.formType === 'Manual' ? (
                                <ManualEntry {...this.props}/>
                            ) : null
						) : (
						<EntranceForm
							handleLogIn={this.props.handleLogIn}
							state={this.state}
							message={this.props.message}
							togglePassword={this.togglePassword}
							setSignUp={this.setSignUp}
							setLogIn={this.setLogIn}
                            setUser={this.props.setUser}
                            isLoggedIn={this.props.isLoggedIn}
						/>
					)}
				</section>
			</div>
		);
	}
}
