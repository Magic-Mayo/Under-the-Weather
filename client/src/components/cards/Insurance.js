import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class InsuranceCard extends Component {
    state={
        
    }
    expand = e => {
        const {id} = e.currentTarget
        console.log(id)
        this.setState({[id]: !this.state[id]})
    }
    render(){
    if(this.props.insurance.length > 0){
        return(
            <div className="Insurance card">
                <h2>Insurance Information</h2>
                {this.props.insurance.map(ins=>(
                    <div className="Insurance card" key={ins._id} id={ins._id} onClick={this.expand}>
                        <h3>{ins.provider}</h3>
                        <h4>{ins.insuranceType}</h4>
                        {this.state[ins._id] && <h4>Group Number: {ins.groupNumber}</h4>}
                        {this.state[ins._id] && <h4>Id Number: {ins.idNumber}</h4>}
                        {this.state[ins._id] && <h4>Deductible: {ins.deductible}</h4>}                          
                        <FontAwesomeIcon icon="minus-circle" className = "insurance-delete" size="2x" 
                        onClick={() => this.props.delete({_id:ins._id, card:this.props.card, route:this.props.route})}>
                        </FontAwesomeIcon>                   
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div className="Insurance card">
            <h2>Insurance Information</h2>
            <Link to={'/insurance'} className="insurance-card-link" style={{textDecoration: "none"}}>
                <div className="insurance-card-link-container">
                    <p className="insurance-card-link-add">Click here to add Insurance!</p>
                </div>
            </Link>
        </div>
    )
};
}