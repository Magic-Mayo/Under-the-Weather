import React, { Component } from 'react';
import Axios from 'axios';

export default class InsuranceForm extends Component {
	state ={
		userId: this.props.userId,
		provider: '',
		policy_number:'',
		group_number:'',
		policy_type:'',
		deductible:''
	};
	
	handleInsuranceChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	submitInsurance =()=>{		
		const insurances={
			userId: this.state.userId,
            route: 'addinsurance',
				insurance:{
				provider:this.state.provider || '',
				policy_number:this.state.policy_number || '',
				group_number:this.state.group_number ||'',
				policy_type:this.state.policy_type ||'',
				deductible:this.state.deductible || ''
		}

		};

		Axios.post('/account/insurance', insurances).then(
			data =>{
				console.log(data)
				this.props.getNewUserInfo(this.props.userId)
				this.setState({provider: '', policy_number:'', group_number:'', policy_type:'',deductible:''})
			}
		)
	};
		
	render() {
		return (
			<div>			
			<InsuranceInput 
			name={this.props.name}
			provider={this.state.provider}
			policy_number={this.state.policy_number}
			group_number={this.state.group_number}
			policy_type={this.state.policy_type}
			deductible={this.state.deductible}
			handleInsuranceChange={this.handleInsuranceChange}
			submitInsurance={this.submitInsurance}
			/>			
			</div>
		);
	}
}

function InsuranceInput(props) {
	return (
		<div>
			<h1>Hello, {props.name}</h1>
			<h2>Add insurance information</h2>			
			<form>
				Insurace Name:<input type="text" name ="provider" value={props.provider} 
				onChange={props.handleInsuranceChange}></input>
				Policy/Identification Number:<input type="text" name ="policy_number" value={props.policy_number}
				onChange={props.handleInsuranceChange}></input>
				Group Number:<input type="text" name ="group_number" value={props.group_number}
				onChange={props.handleInsuranceChange}></input>
				Policy Type:<input type="text" name ="policy_type"  value={props.policy_type} 
				onChange={props.handleInsuranceChange}></input>
				Deductible:<input type="text" name ="deductible" value={props.deductible}
				onChange={props.handleInsuranceChange}></input>
				{/* <input type="text"></input> */}
			</form>
			<button onClick= {props.submitInsurance}>Submit</button>
		</div>
	)
};

