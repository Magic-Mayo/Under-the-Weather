import React, { Component } from 'react';
import Axios from 'axios';


export default class InsuranceCard extends Component {
   state ={
       results:[]
   } 

    render(){
        console.log(this.props.user.mediData)
        return(
            <div className="Insurance card">
            <h2>Insurance Information</h2>
            {this.props.user.mediData.insurance.map((res)=>(
            <Insurance 
            provider ={res.provider}
            type ={res.insuranceType}
            groupNumber ={res.groupNumber}
            idNumber= {res.idNumber}
            deductible={res.deductible}
            />
            ))}
            </div>
        )
    };
};

function Insurance(props) {
    return (
        <div className="Insurance card">            
            <h3>{props.provider}</h3>
            <h4>{props.type}</h4>
            <h4>Group Number: {props.groupNumber}</h4>
            <h4>Id Number: {props.idNumber}</h4>
            <h4>Deductible: {props.deductible}</h4>
        </div>
    );
}

 