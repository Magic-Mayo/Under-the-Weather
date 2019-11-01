import React, { Component } from 'react';
import SymptomList from '../../data/symptoms.json';
import Symptoms from './symptoms';
import API from '../../utils/SymptomAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

export default class SymptomForm extends Component {
	state = {
        SymptomList,
		symptomsValue: '',
		responses: []
    };
    
    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        // if(this.props.location.state){
        //     const contact = this.props.location.state.contact
        //     this.setState({

        //     })
        // }
    }
    
	setSymptom = (e) => {
		console.log(e.target.value)

		this.setState({
			symptomsValue: e.target.value
		})

		this.handleSubmit()
	}

	//SEANS STUFF WITH SEARCH BAR 
	updateDropDown = (e) => {
		e.persist()
		this.setState({
			symptomsValue: e.target.value
		})
	}

	handleChange = (event) => {
		// console.log('THE INPUT THAT WAS SELECTED ' + event.target.value);

		this.setState({
			symptomsValue: event.target.value
		})

		this.checkMatch(event.target.value)
	}

	checkMatch = (val) => {
        const filteredResults = this.state.SymptomList.filter((symptom) => {
			if (symptom.name.substring(0, val.length) === val) {
				return symptom;
			}
		});

		this.setState({
			responses: filteredResults
		});
    };

	handleSubmit = (event) => {
		if (event) event.preventDefault()
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

	render() {
        // console.log(this.props.params)
		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What Symptom(s) Are You Experiencing?</h1>
                <Link to="/symptom/entry">
                    <h3 className="symptom-form-subtitle">If it isn't listed, write your own in</h3>
                </Link>
                <hr></hr>
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
						{this.state.responses.map(symptom => (
							<div key={symptom.ID} className="symptom-form-results-item">
								<h5 className="item-name">{symptom.name}</h5>
								<button value={symptom.name} onClick={this.setSymptom} className="add-symptom">
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
				</div>
				{/* <Symptoms handleSubmit={this.handleSubmit} handleChange={this.handleChange} symptomsValue={this.state.symptomsValue}/> */}
			</div>
		);
	}
}



//SEANS SEARCH BAR + BUTTON 
function Input(props) {
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
