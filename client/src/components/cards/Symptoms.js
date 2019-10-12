import React from 'react';

import SymptomFilter from '../forms/SymptomFilter';
function Symptoms(props) {

    // DUMMY DATA STARTS HERE

    const formData = {
        options: [
            'symptoms',
            'type',
            'severity',
            'time',
            'diagnosis'
        ],
        symptoms: [
            'headache',
            'dizziness',
            'vomiting'
        ],
        types: [
            'throbbing',
            'sharp',
            'buzzing',
            'aching'
        ],
        severities: [
            'mild',
            'mildly painful',
            'painful',
            'very painful'
        ],
        diagnosis: false
    };

    // DUMMY DATA ENDS HERE
    return (
        <div className="Symptoms card">
            <h2>Symptom History</h2>
            <SymptomFilter 
                data={formData}
            />
        </div>
    );
}

export default Symptoms;