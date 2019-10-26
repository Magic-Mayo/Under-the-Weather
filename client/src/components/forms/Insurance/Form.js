import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function InsuranceInput(props) {
	return (
		<div className="insurance-entry">
			<form className="insurance-entry-grid">
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-name"> 
				Insurace Name:<input
					type="text"
					name="provider"
					value={props.provider}
					onChange={props.handleInsuranceChange}
				/>
				</div>
				Policy/Identification Number:<input
					type="text"
					name="idNumber"
					value={props.idNumber}
					onChange={props.handleInsuranceChange}
				/>
				Group Number:<input
					type="text"
					name="groupNumber"
					value={props.groupNumber}
					onChange={props.handleInsuranceChange}
				/>
				Policy Type:<input
					type="text"
					name="insuranceType"
					value={props.insuranceType}
					onChange={props.handleInsuranceChange}
				/>
				Deductible:<input
					type="text"
					name="deductible"
					value={props.deductible}
					onChange={props.handleInsuranceChange}
				/>
				{/* <input type="text"></input> */}
			</form>
			<button onClick={props.insuranceToDatabase}>Submit</button>
		</div>
	)
};

export default class InsuranceForm extends Component {
	state = {
		userId: this.props.userId,
		provider: '',
		idNumber: '',
		groupNumber: '',
		insuranceType: '',
		deductible: ''
	};

	handleInsuranceChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	insuranceToDatabase = () => {
		const insurance = {
			route:"addinsurance",
			insurance:{
			provider: this.state.provider,
			idNumber: this.state.idNumber,
			groupNumber: this.state.groupNumber,
			insuranceType: this.state.insuranceType,
			deductible: this.state.deductible
			},
			userId:this.state.userId
		};

		Axios.post('/account/insurance', insurance).then((data) => {
			console.log(data);
			this.setState({ provider: '', idNumber: '', groupNumber: '', insuranceType: '', deductible: '' });
		});
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
                    idNumber={this.state.idNumber}
                    groupNumber={this.state.groupNumber}
                    insuranceType={this.state.insuranceType}
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



