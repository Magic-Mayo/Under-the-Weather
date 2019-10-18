import React from 'react';

import SymptomFilter from '../forms/SymptomFilter';

function Symptoms(props) {

    // DUMMY DATA STARTS HERE

    const formData = {
        options: [
            {
                name: 'severity',
                choices: [
                    'mild',
                    'mildly painful',
                    'painful',
                    'very painful'
                ]
            },
            {
                name: 'type',
                choices: [
                    'throbbing',
                    'sharp',
                    'buzzing',
                    'aching'
                ]
            },
            {
                name: 'symptoms',
                choices: [
                    'headache',
                    'dizziness',
                    'vomiting'
                ]
            },
            {
                name: "time",
                choices: [
                    'today',
                    'yesterday',
                    'past week',
                    'past month',
                    'all time'
                ]
            },
            {
                name: 'diagnosis',
                choices: [
                    'none',
                    'clinical migraines',
                    'flu',
                    'kidney infection'
                ]
            }
        ],
    };

    // DUMMY DATA ENDS HERE
    return (
        <div className="Symptoms card">
            <h2>Symptom History</h2>
            <SymptomFilter 
                data={formData}
            />

            <section className="Symptoms-content-container">
                {/* {this.props.symptomHistory.map(symptoms=>{
                    map out symptoms with map function in place
                })} */}
            </section>
        </div>
    );
}

export default Symptoms;