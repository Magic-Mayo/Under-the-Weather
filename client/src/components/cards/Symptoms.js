import React from 'react';

import SymptomFilter from '../forms/SymptomFilter';

function Symptoms(props) {

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
            },
            {
                name: 'Diagnosis',
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