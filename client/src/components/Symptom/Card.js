import React from 'react';
import moment from 'moment';
import Filter from './Filter';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Symptoms(props) {

    // DUMMY DATA STARTS HERE

    const formData = {
        options: [
            {
                name: 'Severity',
                choices: [
                    'mild',
                    'mildly painful',
                    'painful',
                    'very painful'
                ]
            },
            {
                name: 'Type',
                choices: [
                    'throbbing',
                    'sharp',
                    'buzzing',
                    'aching'
                ]
            },
            {
                name: 'Symptoms',
                choices: [
                    'headache',
                    'dizziness',
                    'vomiting'
                ]
            },
            {
                name: "Time",
                choices: [
                    'today',
                    'yesterday',
                    'past week',
                    'past month',
                    'all time'
                ]
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
        ],
    };

    const sortSymptoms = e => {
        const {innerText} = e.target;
        const text = innerText;
        console.log(text);

    }

    // DUMMY DATA ENDS HERE

    if(props.symptoms.length > 0){
        return (
            <div className="Symptoms card">
                <h2>Symptom History</h2>
                <Filter 
                    data={formData}
                    sort={sortSymptoms}
                />

                <section className="symptoms-content-container">
                    {props.symptoms.map(symptoms=>(
                        <div key={symptoms._id} className="symptoms-result-container">
                            <p className="symptoms-result-item-type" >{symptoms.painType} {symptoms.symptoms}</p>
                            <p className="symptoms-result-item-severity">{symptoms.severity}</p>
                            <p className="symptoms-result-item-time">{
                                moment().diff(symptoms.time, 'hours') > 0 && moment().diff(symptoms.time, 'hours') <= 23 ?
                                    `${moment().diff(symptoms.time, 'hours')} hours ago`:
                                        (moment().diff(symptoms.time, 'hours') >= 24 && moment().diff(symptoms.time, 'hours') < 48 ? 
                                            `Yesterday | ${moment(symptoms.time).format("h:MM A")}` :
                                                (moment().diff(symptoms.time, 'days') === 2 ?
                                                `${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:MM A')}` :
                                                    moment().diff(symptoms.time, 'days') === 3 ?
                                                        `${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:MM A')}` :
                                                            moment().diff(symptoms.time, 'days') === 4 ?
                                                                `${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:MM A')}` :
                                                                    moment().diff(symptoms.time, 'days') === 5 ?
                                                                        `${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:MM A')}` :
                                                                            (moment().diff(symptoms.time, 'days') === 6 ?
                                                                                `${moment().to(symptoms.time)} | ${moment(symptoms.time).format('h:MM A')}` :
                                        moment(symptoms.time).format('DD MMM | h:MM A'))))
                                }
                            </p>
                            <p className="symptoms-result-item-body">{symptoms.bodyPart}</p>
                        <Link to={{pathname: `dashboard/form/symptom/${symptoms._id}`, state: {edit: true, symptoms}}}
                        className="symptoms-result-edit">
                            <FontAwesomeIcon icon="edit" size="2x"/>
                        </Link>
                        </div>
                    ))}
                </section>
            </div>
        );
    }

    return (
        <div className="Symptoms card">
            <h2>Symptom History</h2>
                <Filter 
                    data={formData}
                />
            <Link to={{pathname: '/dashboard/form/symptom', state: {add: true}}} className="symptoms-card-link" style={{textDecoration: "none"}}>
                <div className="symptoms-card-link-container">
                    <p className="symptoms-card-link-add">Click here to add new Symptoms!</p>
                </div>
            </Link>
        </div>
    )
}