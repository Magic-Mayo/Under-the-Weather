import React, { Component } from 'react';
import SymptomList from './symptoms.json';
import Symptoms from './Symptoms';

export default class SymptomForm extends Component {
	state = {
		SymptomList
	};
	render() {
		console.log('PROPS IN SYMPTOM FORM', this.props);
		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What type of symptom are you experiencing?</h1>
				<p>Enter a {this.props.formType}</p>

				<Input />
				<div className="symptom-form-submit-container">
					{/* <button type="button" className="symptom-form-submit">
                        Add symptom
                    </button> */}
					<button type="button" className="symptom-form-close">
						Close Form X
					</button>
				</div>
				<Symptoms handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} />
			</div>
		);
	}
}

function Input(props) {
	return (
		<div>
			<form className="symptom-form">
				<input
					// value=''
					name="Symptom Search"
					type="text"
					placeholder="migraine"
					className="symptom-form-search-input"
				/>
				<button type="button" className="symptom-form-search-submit">
					Enter
				</button>
			</form>
		</div>
	);
}
