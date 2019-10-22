import React, { Component } from 'react';
import API from '../../../utils/API';
import PDropDown from '../../practicesDropDown';

class Search extends Component {
	state = {
		doctors: [],
		search: '',
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
	};

	handleInputChange = (event) => {
		this.setState({ search: event.target.value });
	};

	drSearch = (event) => {
		event.preventDefault();
		API.SearchSpecialty(this.state.search, this.state.latitude, this.state.longitude).then((res) => {
			console.log(res.data.data);
			this.setState({ results: res.data.data });
		});
	};

	render() {
		return (
			<div>
				<h1 className="provider-form-title form-title">What type of doctor are you looking for?</h1>
				<h3 className="provider-form-subtitle">We'll Search Around The Area For You</h3>

				<Input
					latitude={this.state.latitude}
					longitude={this.state.longitude}
					drSearch={this.drSearch}
					handleInputChange={this.handleInputChange}
				/>
				<section className="provider-form-results">
					{this.state.results.map((res) => (
						<Results
							src={res.profile.image_url}
							firstName={res.profile.first_name}
							lastName={res.profile.last_name}
							bio={res.profile.bio}
							practices={res.practices}
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
				<h1>{props.results}</h1>
				<button type="submit" onClick={props.drSearch} 					className="provider-form-search-submit">
					Submit
				</button>
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
				<select>
					<option value="">Office Locations</option>
					{props.practices.map((res) => (
						<option value="">
							{res.name}
							{' Address: ' +
								res.visit_address.street +
								' ' +
								res.visit_address.city +
								' ' +
								res.visit_address.state +
								' ' +
								res.visit_address.zip}
						</option>
					))}
				</select>
			</p>
		</div>
	);
}

export default Search;
