import React, { Component } from 'react';
import Axios from 'axios';


export default class InsuranceCard extends Component {
   state ={
       results:[]
   }
   componentDidMount(){
       this.InsuranceDbCall();
   }
   InsuranceDbCall = ()=>{
       Axios.get(`/user/:user`)
       .then(res => {       
        this.setState({results:res})
        console.log(res)
       })
   }


    render(){
        return(
            <Insurance />
        )
    };
};

function Insurance(props) {
    return (
        <div className="Insurance card">
            <h2>Insurance Details</h2>
        </div>
    );
}

 