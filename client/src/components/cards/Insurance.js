import React from 'react';
import {Link} from 'react-router-dom';

export default function InsuranceCard(props) {

    if(props.insurance.length > 0){
        return(
            <div className="Insurance card">
                <h2>Insurance Information</h2>
                {props.insurance.map(ins=>(
                    <div className="Insurance card" key={ins._id}>
                        <h3>{ins.provider}</h3>
                        <h4>{ins.insuranceType}</h4>
                        {ins.groupNumber && <h4>Group Number: {ins.groupNumber}</h4>}
                        {ins.idNumber && <h4>Id Number: {ins.idNumber}</h4>}
                        {ins.deductible && <h4>Deductible: {ins.deductible}</h4>}
                        <button onClick={() => props.deleteObject({_id:ins._id, card:props.card, route:props.route})}>delete</button>
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