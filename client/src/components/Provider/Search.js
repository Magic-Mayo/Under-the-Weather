import React, { Component } from 'react';
import API from '../../utils/API';
// import Specialist from '../../data/specialist.json'
import { withRouter } from 'react-router-dom';

class Search extends Component {
	state = {
		doctors: [],
		latitude: '',
		longitude: '',
		results: []
	};
	componentDidMount() {
		this.userLocation();
	}

	userLocation = () => {
		const
		 options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			},
			success = (pos) => {
				const crd = pos.coords;
				console.log('Your current position is:');
				console.log(`Latitude : ${crd.latitude}`);
				console.log(`Longitude: ${crd.longitude}`);
				console.log(`More or less ${crd.accuracy} meters.`);
				this.setState({ longitude: crd.longitude, latitude: crd.latitude });
			},
			error = (err) => {
				console.warn(`ERROR(${err.code}): ${err.message}`);
			};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	drSearch = (event) => {
		event.preventDefault();
		API.SearchSpecialty(this.props.search, this.state.latitude, this.state.longitude).then((res) => {
			if(res){
                console.log(res.data.data)
                this.setState({ results: res.data.data });
                this.props.setSearchResults();
            }
		})
	}

	updatePhoneDisplay = (event) => {
		event.persist();
		console.log(event)
    }
    
	render() {
		return (
			<div>
				<h1 className="provider-form-title form-title">What type of doctor are you looking for?</h1>
				<h3 className="provider-form-subtitle">We'll Search Around The Area For You</h3>

				<Input
					latitude={this.state.latitude}
					longitude={this.state.longitude}
                    drSearch={this.drSearch}
                    handleInputChange={this.props.handleInput}
                    entry={this.props.entry}
				/>
				<section className={this.props.entry ? "provider-form-results hide" : "provider-form-results"}>
					{this.state.results.map((res) => (
						<Results
							src={res.profile.image_url}
							firstName={res.profile.first_name}
							lastName={res.profile.last_name}
							bio={res.profile.bio}
							practices={res.practices}
							updatePhoneDisplay={this.updatePhoneDisplay}
						/>
					))}
				</section>
			</div>
		);
	}
}
function Input(props) {
	return (
		<div>
			<form className="provider-form">
				<input
					value={props.search}
					name="Dr search"
					onChange={props.handleInputChange}
					type="text"
					placeholder="cardiologist"
					className="provider-form-search-input"
				/>
                {props.results &&
				    <h1>{props.results}</h1>
                }
                <button
                    type="submit"
                    onClick={props.drSearch}
                    className="provider-form-search-submit"
                >
					Submit
				</button>{' '}
                <span className="provider-form-link">Already have this information?{' '}
                    <span className="link" onClick={props.entry}>Click here to input manually</span>
                </span>
			</form>
		</div>
	);
}

function Results(props) {
	console.log(props)
	return (
		<div className="provider-form-results-item">
			<img src={props.src} alt="Smiley face" height="42" width="42" />
			<p>
				Name: {props.firstName}, {props.lastName}
			</p>
			<p>Bio: {props.bio}</p>
			<p>
				Practices:{' '}
				<select onClick={props.updatePhoneDisplay}>
					<option value="">Office Locations</option>
					{props.practices.map((practice) => {
						// console.log(practice).phones[{type: "landline"}];
						const phone = practice.phones.filter(phone => phone.type === 'landline')[0].number
						console.log(practice.name + "phone number is" + phone);
						return (
							<option value="" phone={phone}>
								{practice.name}
								{' Address: ' +
									practice.visit_address.street +
									' ' +
									practice.visit_address.city +
									' ' +
									practice.visit_address.state +
									' ' +
									practice.visit_address.zip}
							</option>
						)
					})}
				</select>
			</p>
		</div>
	);
}

export default withRouter(Search);
