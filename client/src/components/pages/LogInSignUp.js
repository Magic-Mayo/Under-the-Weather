import React, { Component } from 'react'
import EntranceForm from '../forms/EntranceForm'

export default class LogInSignUp extends Component {
	state = {
		loginActive: true,
		signupActive: false,
		currentPage: 0
	}
	setLogIn = () => {
		this.setState({
			loginActive: true,
			signupActive: false
		})
	}

	setSignUp = () => {
		this.setState({
			signupActive: true,
			loginActive: false
		})
	}

	render() {
		console.log(this.state);
		return (
			<div className="LogInSignUp">
				<section
					className={`login-form-container card ${this.state.loginActive ? 'loginActive' : 'signupActive'}`}
				>
					<div className="login-form-btn-wrapper">
						<button className="login-form-btn login-form-btn-signup" onClick={this.setSignUp}>
							Sign Up
						</button>
						<button className="login-form-btn login-form-btn-login" onClick={this.setLogIn}>
							Log In
						</button>
					</div>
					<EntranceForm loginActive={this.state.loginActive} page={this.state.currentPage} />
				</section>
			</div>
		);
	}
}


// function EntranceForm({loginActive, loading}) {
//     const data = loginActive ? {
//         loginType: "existing",
//         headingText: "Please Enter Your Log In Info",
//         inputs: [
//             {
//                 name: "email",
//                 label: "Email",
//                 type: () => this.name
//             },
//             {
//                 name: "password",
//                 label: "Password",
//                 type: () => this.name
//             },
//             {

//             }
//         ]
//     } : {
//         loginType: "new",
//         headingText: "Enter Your Info To Sign Up For a Free Account"
//     }
//     console.log(data)

//     return (
//         !loading ? 
//         <div className={`login-form login-form-${data.loginType}`}>
//             <h1 className={`login-form-title`}>{data.headingText}</h1>
//         </div>:
//         <Loading loading={loading}/>
//     )
// }


