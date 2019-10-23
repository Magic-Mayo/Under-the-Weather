import React, { Component } from 'react';
import Axios from 'axios';


export default class InsuranceCard extends Component {
   state ={
       results:[]
   }
   componentDidMount(){
    //    this.InsuranceDbCall();
   }
//    InsuranceDbCall = ()=>{
//        Axios.get(`/user/${this.state.user}`)
//        .then(res => {       
//         this.setState({results:res})
//         console.log(res.)
//        })
//    }


    render(){
        console.log(this.props.user.mediData)
        return(
            <Insurance 
            provider ={this.props.user.mediData.insurance[0].provider}
            type ={this.props.user.mediData.insurance[0].insuranceType}
            groupNumber ={this.props.user.mediData.insurance[0].groupNumber}
            idNumber= {this.props.user.mediData.insurance[0].idNumber}
            deductible={this.props.user.mediData.insurance[0].deductible}
            />
        )
    };
};

function Insurance(props) {
    return (
        <div className="Insurance card">
            <h1>Insurance Information</h1>
            <h3>{props.provider}</h3>
            <h4>{props.type}</h4>
            <h4>Group Number: {props.groupNumber}</h4>
            <h4>Id Number: {props.idNumber}</h4>
            <h4>Deductible: {props.deductible}</h4>
        </div>
    );
}

 