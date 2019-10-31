import React, { Component } from 'react';
import EntranceForm from '../Login/EntranceForm';
import ProviderForm from '../Provider/Form'
import SymptomForm from '../Symptom/Form'
import ContactForm from '../Contact/Form'
import InsuranceForm from '../Insurance/Form'
import ProviderManualEntry from '../Provider/ManualEntry';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
// import PropTypes from 'prop-types';


class FormContainer extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0,
        showPassword: false
    };

	componentDidMount = () => {
        if(this.props.menuState){
            this.props.toggleMenu()
        }
        const id = this.props.match.params.id
        console.log(id)
    }

    // static propTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    // }
    
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
        // const { match, location, history } = this.props;
        console.log(this.props.match)
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
                                <ProviderManualEntry {...this.props}/>
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

export default withRouter(FormContainer);