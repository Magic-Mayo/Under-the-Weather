import React, { Component } from 'react';
import Axios from 'axios';

export default class InsuranceForm extends Component {
	state ={
		userId: this.props.userId,
		provider: '',
		idNumber:'',
		groupNumber:'',
		insuranceType:'',
		deductible:''
	};
	
	handleInsuranceChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	submitInsurance =()=>{		
		const insurance={
			userId: this.state.userId,
            route: 'addinsurance',
				insurance:{
				provider:this.state.provider || '',
				idNumber:this.state.idNumber || '',
				groupNumber:this.state.groupNumber ||'',
				insuranceType:this.state.insuranceType ||'',
				deductible:this.state.deductible || ''
		}

		};

		Axios.post('/account/insurance', insurance).then(
			data =>{
				console.log(data)
				this.props.getNewUserInfo(this.props.userId)
				this.setState({provider: '', idNumber:'', groupNumber:'', insuranceType:'',deductible:''})
			}
		)
	};
		
	render() {
		return (
			<div>			
			<InsuranceInput 
			name={this.props.name}
			provider={this.state.provider}
			idNumber={this.state.idNumber}
			groupNumber={this.state.groupNumber}
			insuranceType={this.state.insuranceType}
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
				Policy/Identification Number:<input type="text" name ="idNumber" value={props.idNumber}
				onChange={props.handleInsuranceChange}></input>
				Group Number:<input type="text" name ="groupNumber" value={props.groupNumber}
				onChange={props.handleInsuranceChange}></input>
				Policy Type:<input type="text" name ="insuranceType"  value={props.insuranceType} 
				onChange={props.handleInsuranceChange}></input>
				Deductible:<input type="text" name ="deductible" value={props.deductible}
				onChange={props.handleInsuranceChange}></input>
				{/* <input type="text"></input> */}
			</form>
			<button onClick= {props.submitInsurance}>Submit</button>
		</div>
	)
};

