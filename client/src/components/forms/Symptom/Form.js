import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SymptomList from './symptoms.json';
import Symptoms from './Symptoms'

export default class SymptomForm extends Component {
	state = {
		SymptomList,
		searchVal: ''
	}

	updateDropDown = (e) => {
		e.persist();
		this.setState({
			searchVal: e.target.value
		})
	}
	render() {
		console.log("THIS IS THE SYMPTOM FORM PROPS",this.props)

		return (
			<div>
				<h1>{this.props.formType}</h1>
				<p>Enter a {this.props.formType}</p>

				<Input updateDropDown={this.updateDropDown} searchVal={this.state.searchVal}/>
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
				<Symptoms handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} />
			</div>
		);
	}
}

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
