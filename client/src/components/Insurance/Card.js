import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InsuranceCard(props) {

    if(props.insurance.length > 0){
        return(
            <div className="Insurance card">
                <h2>Insurance Information</h2>
                {props.insurance.map(ins=>(
                    <div className="Insurance card" key={ins._id}>
                        <h3>{ins.provider}</h3>
                        <h4>{ins.insuranceType}</h4>
                        {ins.groupNumber && props.itemIsExpanded[ins._id] && <h4>Group Number: {ins.groupNumber}</h4>}
                        {ins.idNumber && props.itemIsExpanded[ins._id] && <h4>Id Number: {ins.idNumber}</h4>}
                        {ins.deductible && props.itemIsExpanded[ins._id] && <h4>Deductible: {ins.deductible}</h4>}

                        {props.itemIsExpanded[ins._id] ? 
                            <FontAwesomeIcon
                            className="insurance-card-expand"
                            icon="angle-double-up"
                            size="2x"
                            id={ins._id}
                            onClick={(e)=>props.expand(e)}
                            />
                            
                            :
                            
                            <FontAwesomeIcon
                            className="insurance-card-expand"
                            icon="angle-double-down"
                            size="2x"
                            id={ins._id}
                            onClick={(e)=>props.expand(e)}
                            />
                        }

                        <FontAwesomeIcon icon="minus-circle" className = "insurance-delete" size="2x" 
                        onClick={() => props.delete({_id:ins._id, card:props.card, route:props.route})}>
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