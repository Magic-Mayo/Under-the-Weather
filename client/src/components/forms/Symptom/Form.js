import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SymptomList from './symptoms.json';
import Symptoms from './Symptoms';
import API from '../../../utils/SymptomAPI';
// import { load } from 'dotenv/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SymptomForm extends Component {
	state = {
		SymptomList,
		symptomsValue: '',
		responses: []
	};

	setLowerCase = (Sy) =>
		this.state.SymptomList.map(
			(symptom, index) => (this.state.SymptomList[index].Name = symptom.Name.toLowerCase())
		);

	//SEANS STUFF WITH SEARCH BAR 
	updateDropDown = (e) => {
		e.persist();
		this.setState({
			symptomsValue: e.target.value
		});
	};

	handleChange = (event) => {
		console.log('THE INPUT THAT WAS SELECTED ' + event.target.value);

		this.setState({
			symptomsValue: event.target.value
		});

		this.checkMatch(event.target.value);
	};

	checkMatch = (val) => {
		const filteredResults = this.state.SymptomList.filter((symptom) => {
			// console.log(symptom.Name);

			if (symptom.Name.includes(val, 0)) {
				console.log(symptom.Name);
				return symptom.Name;
			}
			// symptom.Name.startsWith(val)})

			// console.log('HERE ARE THE FILTERED RESULTS', filteredResults);
		});

		this.setState({
			responses: filteredResults
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log('+++++++++++++++++++++++++++++');
		console.log(this.state.symptomsValue);
		console.log(this.props.userId);
		console.log('+++++++++++++++++++++++++++++');

		// set state to reflect the new symptoms in the user - push new symptom
		// once we pushed new symptom, submit the whole edited user to the db.
		API.updateUser({
			userId: this.props.userId,
			symptom: {
				symptoms: this.state.symptomsValue
			},
			route: 'addsymptom'
		})
			.then((res) => this.setUser(res.data))
			.catch((err) => console.log(err));
	};

	checkMatch = (val) => {
		const filteredResults = this.state.SymptomList.filter((symptom) => {
			// console.log(symptom.Name);

			if (symptom.Name.includes(val, 0)) {
				console.log(symptom.Name);
				return symptom.Name;
			}
			// symptom.Name.startsWith(val)})

			// console.log('HERE ARE THE FILTERED RESULTS', filteredResults);
		});

		this.setState({
			responses: filteredResults
		});
	};

	render() {
		this.setLowerCase();
		// console.log('THIS IS THE SYMPTOM FORM PROPS', this.props);

		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What Symptom Are You Experiencing?</h1>
				<form className="symptom-form" onSubmit={this.handleSubmit}>
					<input
						value={this.state.symptomsValue}
						name="Symptom Search"
						type="text"
						placeholder="migraine"
						className="symptom-form-search-input"
						onChange={this.handleChange}
					/>
					<section className="symptom-form-results">
						{this.state.responses.map((response) => (
							<div className="symptom-form-results-item">
								<h5 className="item-name">{response.Name}</h5>
								<button type="submit" className="add-symptom">
									<FontAwesomeIcon icon="plus" className="add-symptom-icon" />
								</button>
							</div>
						))}
					</section>
					{/* <button type="submit">Submit</button> */}
				</form>

				<div className="symptom-form-submit-container">
					{/* <button type="button" className="symptom-form-submit">
                        Add symptom
                    </button> */}
					<Link to="/dashboard" className="closeForm">
						<button type="button" className="symptom-form-close">
							Close Form X
						</button>
					</Link>
				</div>
				{/* <Symptoms handleSubmit={this.handleSubmit} handleChange={this.handleChange} symptomsValue={this.state.symptomsValue}/> */}
			</div>
		);
	}
}



//SEANS SEARCH BAR + BUTTON 
function Input(props) {
	console.log(props)
	return (
		<div>
			<form className="symptom-form">
				<input
					value={props.searchVal}
					name="Symptom Search"
					type="text"
					placeholder="migraine"
					className="symptom-form-search-input"
					onChange={props.updateDropDown}
				/>
				<button type="button" className="symptom-form-search-submit">
					Enter
				</button>
			</form>
		</div>
	);
}

//END OF SEANS SHIT
