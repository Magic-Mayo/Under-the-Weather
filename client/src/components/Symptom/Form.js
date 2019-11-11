import React, { Component } from 'react';
import SymptomList from '../../data/symptoms.json';
// import Symptoms from './symptoms';
import API from '../../utils/SymptomAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class SymptomForm extends Component {
	state = {
        SymptomList,
		symptomsValue: '',
        responses: [],
        entry: false,
        name: '',
        type: '',
        insurance: '',
        address:  '',
        city:  '',
        state:  '',
        zip: '',
        phone: '',
        date: '',
        time: '11:00',
        severity: '',
        type: '',
        symptom: '',
        body: ''
    };
    
    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        const {state} = this.props.location;
        if(state){
            if(state.provider){
                const provider = state.provider
                this.setState({
                    name: provider.name || '',
                    type:  provider.doctorType || '',
                    insurance: provider.insurance || '',
                    address:  provider.address.streetAddress || '',
                    city:  provider.address.city || '',
                    state:  provider.address.state || '',
                    zip: provider.address.zip || '',
                    phone:  provider.phone || '',
                    entry: this.props.location.state.entry
                })
            }
            if(state.add){
                this.setState({add: true});
            }
            if(state.edit){
                this.setState({entry: true});
            }
        }
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
        const filteredResults = this.state.SymptomList.filter(symptom => {
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
			.then((res) => this.props.setUser(res.data))
			.catch((err) => console.log(err));
    };
    
    handleInput = e => {
        const {name,value} = e.target;
        this.setState({[name]: value});
    }

    selectDate = date => {
        this.setState({date: date});
    }

	render() {
		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What Symptom(s) Are You Experiencing?</h1>
                <h3 className="symptom-form-subtitle">If it isn't listed, write your own in</h3>
                <hr></hr>

                {this.state.edit ?
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
                :
                    <>
                        <FirstPage
                        date={this.state.date}
                        time={this.state.time}
                        type={this.state.type}
                        severity={this.state.severity}
                        body={this.state.body}
                        handleInput={this.handleInput}
                        symptom={this.state.symptom}
                        selectDate={this.selectDate}
                        />

                        {/* <div className="symptom-form-submit-container">
                            <button type="button" className="symptom-form-submit" onClick={this.setSymptom}>
                                Add symptom
                            </button>
                        </div> */}
                    </>
                }
                    {/* <Symptoms handleSubmit={this.handleSubmit} handleChange={this.handleChange} symptomsValue={this.state.symptomsValue}/> */}
            </div>
		);
	}
}

function FirstPage(props){
    console.log(props)
    return(
        <>
            <form className="symptom-form-manual-entry-grid">
                <div className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-symptom">
                    <label htmlFor="symptom"><span>*</span>Symptom:</label>
                    <input
                    name="symptom"
                    placeholder="migraine"
                    type="text"
                    value={props.symptom}
                    onChange={props.handleInput}
                    required
                    />
                    <span style={{color: "red", fontSize: "18px"}}>{props.errors}</span>
                </div>
                <div
                className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-severity">
                    <label htmlFor="severity">Severity:</label>
                    <input
                    name="severity"
                    type="radio"
                    value="Mild"
                    onChange={props.handleInput}
                    required
                    />
                    <input
                    name="severity"
                    type="radio"
                    value="Moderate"
                    onChange={props.handleInput}
                    required
                    />
                    <input
                    name="severity"
                    type="radio"
                    value="Severe"
                    onChange={props.handleInput}
                    required
                    />
                    <input
                    name="severity"
                    type="radio"
                    value="Worst Pain I've Ever Felt"
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-type">
                    <label htmlFor="type">Pain Type:</label>
                    <input
                    name="type"
                    placeholder="throbbing, pounding, dull, etc"
                    type="text"
                    value={props.type}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-body">
                    <label htmlFor="body">Body Part:</label>
                    <input
                    name="body"
                    placeholder="Head, arm, leg, etc"
                    type="text"
                    value={props.body}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-time">
                    <label htmlFor="time">Time:</label>
                    <select onSelect={props.chooseDate}
                    name="time"
                    type="text"
                    value={props.time}
                    onChange={props.handleInput}
                    required
                    >
                        <option value={true}>Now</option>
                        <option value={false}>Choose Date and Time</option>
                    </select>
                </div>
                {props.date &&
                    <div
                    className="">
                        <DatePicker
                        // placeholderText="Click to select a date"
                        selected={props.date}
                        onChange={date => props.selectDate(date)}
                        maxDate={new Date()}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        inline
                        openToDate={new Date()}/>
                        {/* <DatePicker
                        placeholderText="Click to select a time"
                        selected={props.time}
                        onChange={time => props.selectTime(time)}
                        maxDate={new Date()}/> */}
                    </div>}
            </form>
        </>
    )
}