import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


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
			<button onClick= {props.insuranceToDatabase}>Submit</button>
		</div>
	)
};

export default class InsuranceForm extends Component {
	state ={
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

	insuranceToDatabase =()=>{		
		const insurance={
				provider:this.state.provider,
				policy_number:this.state.policy_number,
				group_number:this.state.group_number,
				policy_type:this.state.policy_type,
				deductible:this.state.deductible

		};

		Axios.post('/account/insurance', insurance).then(
			data =>{
				console.log(data)
				this.setState({provider: '', policy_number:'', group_number:'', policy_type:'',deductible:''})
			}
		)
	};
		
	render() {
		return (
			<div>
				<h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p>
                <div>			
                    <InsuranceInput 
                    name={this.props.name}
                    provider={this.state.provider}
                    policy_number={this.state.policy_number}
                    group_number={this.state.group_number}
                    policy_type={this.state.policy_type}
                    deductible={this.state.deductible}
                    handleInsuranceChange={this.handleInsuranceChange}
                    insuranceToDatabase={this.insuranceToDatabase}
                    />			
                </div>
                <div className="insurance-form-submit-container">
                    <Link to="/dashboard" className="closeForm">
                        <button type="button" className="insurance-form-close">
                            Close Form X
                        </button>
                    </Link>
                </div>
            </div>
		);
	}
}
