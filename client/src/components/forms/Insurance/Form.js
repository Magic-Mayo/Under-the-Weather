import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function InsuranceInput(props) {
	return (
		<div className="insurance-entry">
			<form className="insurance-entry-grid">
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-name"> 
				<label htmlFor="provider">Insurance Name:</label>
				<input
					type="text"
					name="provider"
					value={props.provider}
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-number"> 
				<label htmlFor="idNumber">Policy/Identification Number</label>
				<input
					type="text"
					name="idNumber"
					value={props.idNumber}
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-grpnumber"> 
				<label htmlFor="groupNumber">Group Number:</label>
				<input
					type="text"
					name="groupNumber"
					value={props.groupNumber}
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-type"> 
				<label htmlFor="insuranceType">Policy Type:</label>
				<input
					type="text"
					name="insuranceType"
					value={props.insuranceType}
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-deduct"> 
				<label htmlFor="deductible">Deductible:</label>
				<input
					type="text"
					name="deductible"
					value={props.deductible}
					onChange={props.handleInsuranceChange}
				/>
				</div>
			</form>
			<div class="insurance-form-submit-container button">
			<button onClick={props.insuranceToDatabase}>Submit</button>
			</div>
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
			<div className="insurance-form-container">
				{/* <h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p> */}
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



