import React, { Component } from 'react';
import SymptomList from '../../data/symptoms.json';
// import Symptoms from './symptoms';
import API from '../../utils/SymptomAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export default class SymptomForm extends Component {
	state = {
        SymptomList,
		symptomsValue: '',
        responses: [],
        entry: false,
        type: '',
        date: new Date(),
        time: new Date(),
        severity: '',
        type: '',
        symptom: '',
        body: '',
        setDate: false,
        edit: false
    };
    
    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        if(this.props.location.state){
            const {state} = this.props.location;
            if(state.symptoms){
                const {symptoms} = state
                this.setState({
                    date: new Date(symptoms.time) || '',
                    type:  symptoms.painType || '',
                    severity: symptoms.severity || '',
                    body:  symptoms.body || '',
                    time:  new Date(symptoms.time) || '',
                    symptom: symptoms.symptom || '',
                    entry: this.props.location.state.entry
                })
            }
            if(state.add){
                this.setState({add: true});
            }
            if(state.edit){
                this.setState({edit: true});
            }
        }
    }
    
	setSymptom = (e) => {
		console.log(e.target.value)

		this.setState({
			symptomsValue: e.target.value
		})

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

        const {value} = event.target;
		this.setState({
			symptomsValue: value
		})

        if(value.length > 0){
            this.checkMatch(value.toLowerCase())
        } else {
            this.setState({responses: []})
        }
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

    selectTime = time => {
        this.setState({time: time})
    }

    setEdit = () => {
        this.setState({edit: !this.state.edit})
    }

	render() {
		return (
			<div className="symptom-form-container">
				<h1 className="symptom-form-title">What Symptom(s) Are You Experiencing?</h1>
                <h3 className="symptom-form-subtitle link" onClick={this.setEdit}>
                    {this.state.edit ? "Back to Search" : "If it isn't listed, write your own in here"}
                </h3>
                <hr></hr>

                {!this.state.edit ?
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
                        selectTime={this.selectTime}
                        setDate={this.state.setDate}
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
                    <span>Mild</span>
                    <input
                    name="severity"
                    type="radio"
                    value="Mild"
                    onChange={props.handleInput}
                    required
                    />
                    <span>Moderate</span>
                    <input
                    name="severity"
                    type="radio"
                    value="Moderate"
                    onChange={props.handleInput}
                    required
                    />
                    <span>Severe</span>
                    <input
                    name="severity"
                    type="radio"
                    value="Severe"
                    onChange={props.handleInput}
                    required
                    />
                    <span>Very Severe</span>
                    <input
                    name="severity"
                    type="radio"
                    value="Very Severe"
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
                {/* <div
                className="input-container symptom-form-manual-entry-grid-item symptom-form-manual-entry-grid-item-time">
                    <label htmlFor="time">Time:</label>
                    <select onSelect={props.chooseDate}
                    name="setDate"
                    type="text"
                    value={props.setDate}
                    onChange={props.handleInput}
                    required
                    >
                        <option value={false}>Now</option>
                        <option value={true}>Choose Date and Time</option>
                    </select>
                </div> */}
                {/* {props.setDate && */}
                    <div
                    className="symptom-form-manual-entry-grid-item-date">
                        <DatePicker
                        selected={props.date}
                        onChange={date => props.selectDate(date)}
                        peekNextMonth
                        showYearDropdown
                        maxDate={new Date()}
                        inline
                        />
                        <span>Time:</span>
                        <DatePicker
                        selected={props.time}
                        onChange={time => props.selectTime(time)}
                        maxDate={new Date()}
                        showTimeSelect
                        timeIntervals={15}
                        showTimeSelectOnly
                        dateFormat="h:mm a"
                        />
                    </div>
                    {/* } */}
            </form>
        </>
    )
}