import React, { Component } from 'react';
import SignInSocial from './SignInSocial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import ProviderForm from '../Provider/Form'
import ContactForm from '../Contact/Form'
import InsuranceForm from '../Insurance/Form'


class SignupForm extends Component {
	state = {
		email: '',
		password: '',
        passwordCheck: '',
        passwordValid: false,
		firstname: '',
		lastname: '',
		sex: '',
		age: '',
        currentPage: 1,
        error: `Use at least one upper and lower case letter, 
        one number and have a minimum of 8 characters in your password.`
    };
    
    componentDidMount(){
        if(this.props.location.state){
            const {state} = this.props.location;

            if(state.details){
                this.setState({currentPage: state.currentPage})
            }
        }
    }

	handleInput = (e) => {
        this.setState({emailInUse: false})
		const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    
    signUpUser = () => {

        if (this.state.email && this.state.password && this.state.firstname && this.state.lastname){
            return axios.post('/newlocal', {
                email: this.state.email,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                DOB: this.state.age,
                gender: this.state.sex,
                password: this.state.password
            }).then(user=>{
                if(user.data){
                    this.props.setUser({user: user.data.user, userId: user.data.userId})
                    this.setState({currentPage: this.state.currentPage + 1})
                } else {
                    this.setState({error: "Error creating new account.  Please try again."})
                }
            })
        }

    }

    validatePassword = () => {
        // Validates password as having one upper and lower case, one number, and at least 8 characters
        if (this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/) ){
                return this.setState({error: false, passwordValid: true})
        }
        return this.setState({passwordValid: false})
    }

    checkEmail = () => {
        // Validates email is properly formatted
        const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!filter.test(this.state.email)) {
            return this.setState({error: "Please enter a valid email address"});
        }
        axios.get(`/check/${this.state.email}`).then(user=>{
            // Let client know user already exists
            if(user.data){
                return this.setState({error: 'Email address already in use', emailInUse: true})
            }

            if(!this.state.passwordValid){
                this.setState({error: `Use at least one upper and lower case letter, 
                one number and have a minimum of 8 characters in your password.`})
            }
            // Let's client know name is available
            return this.setState({emailInUse: false})
        })
    }

	nextPage = () => {
        if(this.state.currentPage === 1){
            if(!this.state.password && !this.state.passwordCheck && !this.state.email){
                return this.setState({error: "Please fill out required fields"})
            } else if (this.state.password !== this.state.passwordCheck){
                return this.setState({error: "Passwords do not match"})
            } else if(!this.state.passwordValid) {
                return this.setState({error: "Password does not meet the requirements.  Please use at least one upper and lower case letter, one number and have a minimum of 8 characters."})
            } else if(!this.state.email){
                return this.setState({error: "Please enter a valid email address"})
            } else {
                this.setState({ currentPage: this.state.currentPage + 1 });
            }
        }

        if(this.state.currentPage === 2){
            if(!this.state.firstname){
                return this.setState({error: "Please enter your first name"})
            } else if(!this.state.lastname){
                return this.setState({error: "Please enter your last name"})
            } else if(!this.state.firstname){
                return this.setState({error: "Please enter your first name"})
            // } else if(!this.state.sex){
            //     return this.setState({error: "Please specify your sex"})
            } else if(!this.state.age){
                return this.setState({error: "Please enter your age"})
            } else if(!this.state.firstname && !this.state.lastname && !this.state.firstname && !this.state.sex && !this.state.age){
                this.setState({error: "Please enter in the required information"})
            }

            this.signUpUser()
        }

    };
    
    prevPage = () => {
        this.setState({currentPage: this.state.currentPage - 1, error: false})
    }

    dashboard = () => {
        return this.setState({dashboard: true})
    }

    openForm = props => {
        if(props === 'contact'){
            return this.setState({form: <ContactForm userId={this.props.userId}/>})
        }
        if(props === 'insurance'){
            return this.setState({form: <InsuranceForm userId={this.props.userId}/>})
        }

        return this.setState({form: <ProviderForm userId={this.props.userId}/>})
    }

	render() {
        if(this.state.dashboard){
            return <Redirect to={{pathname: "/dashboard", state: {isLoggedIn: true}}}/>
        }
        if(this.state.form){
            return (
                <div className="FormContainer">
                    <section className={`form-container ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}>
                        {this.state.form}
                    </section>
                </div>

            )
        }

		return (
			<div className={this.state.currentPage > 2 ? "entrance" : "grid entrance"}>
				<form className={`form-${this.props.loginType}-input-box form-input-area`}>
					<h1 className="form-title">{this.state.currentPage < 3 ? this.props.headingText : "Welcome to Under the Weather!"}</h1>
					{this.state.currentPage === 1 ? (
						<FirstPage
							handleInput={this.handleInput}
							email={this.state.email}
							password={this.state.password}
							showPassword={this.props.showPassword}
							togglePassword={this.props.togglePassword}
                            passwordCheck={this.state.passwordCheck}
                            validatePassword={this.validatePassword}
                            checkEmail={this.checkEmail}
                            error={this.state.error}
                            emailInUse={this.state.emailInUse}
                            passwordValid={this.state.passwordValid}
                        />
					) : this.state.currentPage === 2 ? (
						<SecondPage
							handleInput={this.handleInput}
							firstname={this.state.firstname}
							lastname={this.state.lastname}
							sex={this.state.sex}
							age={this.state.age}
						/>
					) : <DetailsPage
                        redirect={this.state.redirect}
                        handleInput={this.handleInput}
                        {...this.props.match}
                        openForm={this.openForm}
                        />
                    }

                    <div className="btn-container">
                        {this.state.currentPage === 2 && 
                            <button
                            className="previous-btn btn"
                            onClick={this.prevPage} type="button">
                                Previous
                            </button>}

                        {this.state.currentPage > 2 ?
                            (<button type="button" onClick={this.dashboard} className="continue-btn btn">
                                Finish & Go To Dashboard
                            </button>)
                        :
                            !this.state.error ?
                                <button type="button" className="continue-btn btn" onClick={this.nextPage}>
                                        Continue
                                </button>
                            :
                            this.state.error &&
                                <span className="sign-up-error">{this.state.error}
                                </span>
                        }

					</div>
				</form>
                {this.state.currentPage < 3 &&
                    <SignInSocial setUser={this.props.setUser} />
                }
			</div>
		);
	}
}

const FirstPage = (props) => {
	return (
		<>
			<div className="input-container">
				<label htmlFor="email">
					<span>*</span> Email:{' '}
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={props.email}
					onChange={props.handleInput}
					placeholder="johndoe24"
                    required
                    onBlur={props.checkEmail}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password">
					<span>*</span> Password:{' '}
				</label>
				<input
					type={props.showPassword ? 'text' : 'password'}
					name="password"
					value={props.password}
                    onChange={props.handleInput}
                    onBlur={props.validatePassword}
					id="password"
					required
				/>
				<FontAwesomeIcon
					icon={props.showPassword ? 'eye-slash' : 'eye'}
					className="eye-icon"
					onClick={props.togglePassword}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password-check">
					<span>*</span> Re-enter Password:{' '}
				</label>
				<input
					type="password"
					name="passwordCheck"
					value={props.passwordCheck}
					onChange={props.handleInput}
					id="password-check"
					required
				/>
			</div>
		</>
	)
}

function SecondPage(props) {
	return (
		<span style={{ width: '100%' }} className="sign-up-second-page">
			<div className="input-container">
				<label htmlFor="firstname">
					<span>*</span> First Name:{' '}
				</label>
				<input
					type="text"
					name="firstname"
					id="firstname"
					value={props.firstname}
					onChange={props.handleInput}
					placeholder="John"
					required
				/>
			</div>
			<div className="input-container">
				<label htmlFor="lastname">
					Last Name:{' '}
				</label>
				<input 
					type="text" 
					name="lastname"
					id="lastname"
					value={props.lastname} 
					onChange={props.handleInput}
					placeholder="Doe"  
					/>
			</div>
			<div className="flex-between">
				<div className="input-container choose-sex">
					<label htmlFor="sex">
						<span>*</span> Choose Sex:{' '}
					</label>
                    <div className="choose-sex-male">
                        <label for="Male">
                            <span>Male: </span>
                        </label>
                        <input
                            type="radio"
                            name="sex"
                            value="Male"
                            onChange={props.handleInput}
                            selected={props.sex}
                            required
                        />
                    </div>
                    <div className="choose-sex-female">
                        <label for="Female">
                            <span>Female: </span>
                        </label>
					    <input
                            type="radio"
                            name="sex"
                            value="Female"
                            selected={props.sex}
                            onChange={props.handleInput}
                            required
                        />
                    </div>
				</div>
				<div className="input-container">
					<label htmlFor="age">
						<span>*</span> Age:{' '}
					</label>
					<input
						type="number"
						name="age"
						id="age"
						value={props.age}
                        onChange={props.handleInput}
						placeholder="36"
						required

					/>
				</div>
			</div>
		</span>
	);
}

function DetailsPage(props) {
    return (
        <>
            <h3 className="form-subtitle">We recommend adding in some more details before heading over to the dashboard</h3>
            <div className="sign-up-details">
                <Link to={{pathname: "/form/insurance", state: {signup: true}}}>
                    <button type="button" className="details-insurance" onClick={()=>props.openForm('insurance')}>
                        Add Insurance Info
                    </button>
                </Link>
                <Link to={{pathname: "/form/provider", state: {signup: true}}}>
                    <button type="button" className="details-provider" onClick={()=>props.openForm('provider')}>
                        Add Provider Info
                    </button>
                </Link>
                <Link to={{pathname: "/form/contact", state: {signup: true}}}>
                    <button type="button" className="details-contact" onClick={()=>props.openForm('contact')}>
                        Add Emergency Contact Info
                    </button>
                </Link>
            </div>
        </>

    )
}

export default withRouter(SignupForm)