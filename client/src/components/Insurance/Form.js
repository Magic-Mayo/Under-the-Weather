import React, { Component } from 'react';
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
                    placeholder="Cigna"
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-number"> 
				<label htmlFor="idNumber">Policy/ID Number:</label>
				<input
					type="text"
					name="idNumber"
                    value={props.idNumber}
                    placeholder="123ABC"
					onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-grpnumber"> 
				<label htmlFor="groupNumber">Group Number:</label>
				<input
					type="text"
					name="groupNumber"
					value={props.groupNumber}
                    placeholder="123ABC"
                    onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-type"> 
				<label htmlFor="insuranceType">Policy Type:</label>
				<input
					type="text"
					name="insuranceType"
					value={props.insuranceType}
                    placeholder="PPO"
                    onChange={props.handleInsuranceChange}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-deduct"> 
				<label htmlFor="deductible">Deductible:</label>
				<input
					type="text"
					name="deductible"
					value={props.deductible}
                    placeholder="5000/7500"
                    onChange={props.handleInsuranceChange}
				/>
				</div>
			    <button className="insurance-entry-grid-submit" onClick={props.insuranceToDatabase}>Submit</button>
			</form>
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
    
    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
    }

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
				<h1 className="insurance-form-title">Please Enter Insurance Information</h1>
                <hr></hr>
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
		);
	}
}



