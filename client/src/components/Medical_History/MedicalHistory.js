import React, { Component } from 'react';

export default class MedicalHist extends Component{
    state ={
        results:[]
    };
    render(){
        return(
            <MedicalHistory />
        )
    }
}
function MedicalHistory(props) {    
    return (
        <div className="Medical card">
            <h2>Medical History</h2>
        </div>
    );
}

