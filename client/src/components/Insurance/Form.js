import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';
// import { useParams } from 'react-router-dom';

function FirstPage(props) {
	return (
		<div className="insurance-entry-container">
			<form className="insurance-entry-grid">
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-name"> 
				<label htmlFor="provider">Insurance Name:</label>
				<input
					type="text"
					name="provider"
                    value={props.provider}
                    placeholder="Cigna"
					onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-number"> 
				<label htmlFor="idNumber">Policy/ID Number:</label>
				<input
					type="text"
					name="idNumber"
                    value={props.idNumber}
                    placeholder="123ABC"
					onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-grpnumber"> 
				<label htmlFor="groupNumber">Group Number:</label>
				<input
					type="text"
					name="groupNumber"
					value={props.groupNumber}
                    placeholder="123ABC"
                    onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-type"> 
				<label htmlFor="insuranceType">Policy Type:</label>
				<input
					type="text"
					name="insuranceType"
					value={props.insuranceType}
                    placeholder="PPO"
                    onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-deduct"> 
				<label htmlFor="deductible">Deductible:</label>
				<input
					type="text"
					name="deductible"
					value={props.deductible}
                    placeholder="5000/7500"
                    onChange={props.handleInput}
				/>
				</div>
			</form>
		</div>
	)
};

function SecondPage(props){
	return (
		<div className="insurance-entry-container">
			<form className="insurance-entry-grid">
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-doctor"> 
				<label htmlFor="doctor">Doctor visit:</label>
				<input
					type="number"
					name="doctor"
                    value={props.doctor}
                    placeholder="20"
					onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-specialist"> 
				<label htmlFor="specialist">Specialist visit:</label>
				<input
					type="number"
					name="specialist"
                    value={props.specialist}
                    placeholder="75"
					onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-urgent"> 
				<label htmlFor="urgentCare">Urgent Care visit:</label>
				<input
					type="number"
					name="urgentCare"
					value={props.urgentCare}
                    placeholder="150"
                    onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-emergency"> 
				<label htmlFor="emergency">Emergency Room visit:</label>
				<input
					type="number"
					name="emergency"
					value={props.emergency}
                    placeholder="200"
                    onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-brand"> 
				<label htmlFor="brandName">Brand name prescription:</label>
				<input
					type="number"
					name="brandName"
					value={props.brandName}
                    placeholder="15"
                    onChange={props.handleInput}
				/>
				</div>
				<div className="input-container insurance-entry-grid-item insurance-entry-grid-item-generic"> 
				<label htmlFor="generic">Generic prescription:</label>
				<input
					type="number"
					name="generic"
					value={props.generic}
                    placeholder="5"
                    onChange={props.handleInput}
				/>
				</div>
			</form>
		</div>
	)
}

export default class InsuranceForm extends Component {
	state = {
		provider: '',
		idNumber: '',
		groupNumber: '',
		insuranceType: '',
        deductible: '',
        edit: false,
        page: 1,
        doctor: '',
        specialist: '',
        emergency: '',
        urgentCare: '',
        brandName: '',
        generic: '',

    };
    
    componentDidMount() {
        
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        const {state} = this.props.location
        if(state && state.ins){
            const ins = this.props.location.state.ins
            this.setState({
                provider: ins.provider || '',
                idNumber: ins.idNumber || '',
                groupNumber: ins.groupNumber || '',
                insuranceType: ins.insuranceType || '',
                deductible: ins.deductible || '',
                doctor: ins.copay.doctor || '',
                specialist: ins.copay.specialist || '',
                emergency: ins.copay.emergency || '',
                urgentCare: ins.copay.urgentCare || '',
                brandName: ins.copay.prescription.brandName || '',
                generic: ins.copay.prescription.generic || '',
                edit: true
            })
        } else if (state && state.edit){
            this.setState({edit: true})
        }
    }

	handleInput = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
    };
    
    nextPage = () => {
        this.setState({page: this.state.page + 1})
    }

    prevpage = () => {
        this.setState({page: this.state.page - 1})
    }

	addInsurance = (e) => {
		const insurance = {
			route:"addinsurance",
			insurance:{
                provider: this.state.provider,
                idNumber: this.state.idNumber,
                groupNumber: this.state.groupNumber,
                insuranceType: this.state.insuranceType,
                deductible: this.state.deductible,
                copay: {
                    doctor: this.state.doctor,
                    specialist: this.state.specialist,
                    emergency: this.state.emergency,
                    urgentCare: this.state.urgentCare,
                    prescription: {
                        brandName: this.state.brandName,
                        generic: this.state.generic
                    }
                },
                updatedAt: moment(),
                createdAt: moment()
			},
			userId: this.props.userId
		};

		Axios.post('/account/insurance', insurance).then((data) => {
			console.log(data);
            this.setState({ provider: '', idNumber: '', groupNumber: '', insuranceType: '', deductible: '' });
            this.props.setUser(data.data)
		});
    };

    update = id => {
        const updatedData = {
            route: "updateinsurance",
            insurance: {"data.mediData.insurance.$": {
                provider: this.state.provider,
                idNumber: this.state.idNumber,
                groupNumber: this.state.groupNumber,
                insuranceType: this.state.insuranceType,
                deductible: this.state.deductible,
                copay: {
                    doctor: this.state.doctor,
                    specialist: this.state.specialist,
                    emergency: this.state.emergency,
                    urgentCare: this.state.urgentCare,
                    brandName: this.state.brandName,
                    generic: this.state.generic
                },
                updatedAt: moment()
            }},
            key: "data.mediData.insurance._id",
            id: id
        }
        console.log(updatedData)
        return Axios.put('/account/insurance', updatedData).then(user=>{
            console.log(user)
            this.props.setUser(user.data)
        })
    }

	render() {
		return (
			<div className="insurance-form-container form">
				{this.state.page === 1 ? 
                    <h1 className="insurance-form-title">Please Enter Insurance Information</h1> :
                    <h1 className="insurance-form-title">Enter Co-pay Information</h1>}
                <hr></hr>
                {this.state.page ===1 ?
                    <FirstPage 
                    name={this.props.name}
                    provider={this.state.provider}
                    idNumber={this.state.idNumber}
                    groupNumber={this.state.groupNumber}
                    insuranceType={this.state.insuranceType}
                    deductible={this.state.deductible}
                    handleInput={this.handleInput}
                    addInsurance={this.addInsurance}
                    edit={this.edit}
                    update={this.update}
                    /> :
                    <SecondPage
                    doctor={this.state.doctor}
                    specialist={this.state.specialist}
                    urgentCare={this.state.urgentCare}
                    emergency={this.state.emergency}
                    brandName={this.state.brandName}
                    generic={this.state.generic}
                    handleInput={this.handleInput}
                    addInsurance={this.addInsurance}
                    edit={this.edit}
                    update={this.update}
                    />}
            
            <div className="insurance-form-submit-container">
                {this.state.edit &&
                    <button className="insurance-form-next" type="button"
                    onClick={this.state.page === 1 ? this.nextPage : this.prevpage}
                    >{this.state.page === 1 ? "Next" : "Previous"}</button>
                }

                <button className="insurance-form-submit" type="button"
                onClick={this.state.edit ? () => this.update(this.props.match.params.id) : this.addInsurance}
                >{this.state.edit ? "Update" : "Submit"}</button>
            </div>
            </div>
		);
	}
}



