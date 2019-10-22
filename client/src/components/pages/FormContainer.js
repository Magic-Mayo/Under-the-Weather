import React, { Component } from 'react';
import EntranceForm from '../forms/EntranceForm';
import Loading from '../icons/loading';
import ProviderForm from '../forms/Provider/Form'
import SymptomForm from '../forms/Symptom/Form'
import ContactForm from '../forms/Contact/Form'
import InsuranceForm from '../forms/Insurance/Form'

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

	render() {
		return !this.props.loading ? (
			<div className="FormContainer">
				<section className={`form-container card ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}>
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
						/>
					)}
				</section>
			</div>
		) : (
			<Loading loading={this.props.isLoading} />
		);
	}
}
