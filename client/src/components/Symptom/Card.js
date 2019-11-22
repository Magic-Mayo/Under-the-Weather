import React from 'react';
import moment from 'moment';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Symptoms(props) {
	// DUMMY DATA STARTS HERE

	const formData = {
		options: [
			{
				name: 'Severity',
				choices: [ 'mild', 'mildly painful', 'painful', 'very painful' ]
			},
			{
				name: 'Type',
				choices: [ 'throbbing', 'sharp', 'buzzing', 'aching' ]
			},
			{
				name: 'Symptoms',
				choices: [ 'headache', 'dizziness', 'vomiting' ]
			},
			{
				name: 'Time',
				choices: [ 'today', 'yesterday', 'past week', 'past month', 'all time' ]
			}
			// {
			//     name: 'Diagnosis',
			//     choices: [
			//         'none',
			//         'clinical migraines',
			//         'flu',
			//         'kidney infection'
			//     ]
			// }
		]
	};

	// DUMMY DATA ENDS HERE

	if (props.symptoms.length > 0) {
		return (
			<div className="Symptoms card" data-simplebar>
				<h2>Symptom History</h2>
				{/* <Filter data={formData} sort={sortSymptoms} /> */}

				<section className="symptoms-content-container">
					{props.symptoms.sort((a,b)=>{
						return moment(b.time) - moment(a.time);
					}).map((symptoms) => (
						<div key={symptoms._id}
                        className={`symptoms-result-container ${symptoms.severity && "bottom-border"} ${symptoms.severity.toLowerCase()}`}>
							<p className="symptoms-result-item-symptom">
								{symptoms.symptoms} {symptoms.bodyPart && <span>({symptoms.bodyPart})</span>}
							</p>
                            <p className="symptoms-result-item-type">
                                {symptoms.painType}
                            </p>
							<p className="symptoms-result-item-time">
								{moment().diff(symptoms.time, 'hours') > 0 &&
								moment().diff(symptoms.time, 'hours') <= 23 ? (
									`${moment().diff(symptoms.time, 'hours')} hours ago`
								) : moment().diff(symptoms.time, 'hours') >= 24 &&
								moment().diff(symptoms.time, 'hours') < 48 ? (
									`Yesterday | ${moment(symptoms.time).format('h:mm A')}`
								) : moment().diff(symptoms.time, 'days') === 2 ? (
									`${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:mm A')}`
								) : moment().diff(symptoms.time, 'days') === 3 ? (
									`${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:mm A')}`
								) : moment().diff(symptoms.time, 'days') === 4 ? (
									`${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:mm A')}`
								) : moment().diff(symptoms.time, 'days') === 5 ? (
									`${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:mm A')}`
								) : moment().diff(symptoms.time, 'days') === 6 ? (
									`${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:mm A')}`
								) : (
									moment(symptoms.time).format('DD MMM | h:mm A')
								)}
							</p>
							<Link
								to={{
									pathname: `dashboard/form/symptom/${symptoms._id}`,
									state: { update: true, edit: true, symptoms }
								}}
								className="symptoms-result-edit"
							>
								<FontAwesomeIcon icon="edit" className="edit-icon edit-icon-symptom" />
							</Link>
							<span
								className="delete-icon-symptom-wrapper"
								onClick={() =>
									props.delete({ _id: symptoms._id, card: props.card, route: props.route })}
							>
								<FontAwesomeIcon icon="minus" className="delete-icon delete-icon-symptom" />
							</span>
						</div>
					))}
				</section>
			</div>
		);
	}

	return (
		<div className="Symptoms card">
			<h2>Symptom History</h2>
			{/* <Filter data={formData} /> */}
			<Link
				to={{ pathname: '/dashboard/form/symptom', state: { add: true } }}
				className="symptoms-card-link"
				style={{ textDecoration: 'none' }}
			>
				<div className="symptoms-card-link-container">
					<p className="symptoms-card-link-add">Click here to add new Symptoms!</p>
				</div>
			</Link>
		</div>
	);
}
