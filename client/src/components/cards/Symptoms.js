import React from 'react';
import moment from 'moment';
import Filter from '../forms/Symptom/Filter';

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

    // DUMMY DATA ENDS HERE
    return (
        <div className="Symptoms card">
            <h2>Symptom History</h2>
            <Filter 
                data={formData}
            />

            <section className="Symptoms-content-container">
                {props.symptoms.map(symptoms=>(
                    <div key={symptoms._id} className="symptoms-result-container">
                        <p className="symptoms-result-item-type" >{symptoms.painType} {symptoms.symptoms}</p>
                        <p className="symptoms-result-item-severity">{symptoms.severity}</p>
                        <p className="symptoms-result-item-time">{
                            // moment().diff(symptoms.time, 'hours')
                            moment().diff(symptoms.time, 'hours') > 0 && moment().diff(symptoms.time, 'hours') < 24 ?
                                moment().to(symptoms.time) :
                                    (moment().diff(symptoms.time, 'hours') > 24 && moment().diff(symptoms.time, 'hours') < 48 ? 
                                        `Yesterday ${moment(symptoms.time).format("h:MMA")}` :
                                            (moment().diff(symptoms.time, 'days') === 2 ?
                                            `${moment().to(symptoms.time)} ${moment(symptoms.time).format('h:MMA')}` :
                                                moment().diff(symptoms.time, 'days') === 3 ?
                                                `${moment().to(symptoms.time)} ${moment(symptoms.time).format('h:MMA')}` :
                                                    moment().diff(symptoms.time, 'days') === 4 ?
                                                        `${moment().to(symptoms.time)} ${moment(symptoms.time).format('h:MMA')}` :
                                                            moment().diff(symptoms.time, 'days') === 5 ?
                                                                `${moment().to(symptoms.time)} ${moment(symptoms.time).format('h:MMA')}` :
                                                                (moment().diff(symptoms.time, 'days') === 6 ?
                                                                `${moment().to(symptoms.time)} ${moment(symptoms.time).format('h:MMA')}` :
                                                moment(symptoms.time).format('h:MMA - DD MMM'))))
                            }
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}