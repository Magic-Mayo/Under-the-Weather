import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InsuranceCard(props) {



    let anyExpand;
    for (let key in props.itemIsExpanded){
        if(props.itemIsExpanded[key]){
            anyExpand = "expand"
        }
    }

    if(props.insurance.length > 0){
        return(
            <div className="Insurance card" data-simplebar>
                <h2>Insurance Information</h2>
                {props.insurance.map(ins=>(
                    <div
                    className={"insurance-item card"}
                    key={ins._id}>
                        <div>
                            <h3 className="insurance-item-provider">{ins.provider}</h3>
                            <h4 className="insurance-item-type">{ins.insuranceType}</h4>
                        </div>


                        {ins.groupNumber && props.itemIsExpanded[ins._id] &&
                            <h4 className="insurance-item-group">Group Number: {ins.groupNumber}</h4>}

                        {ins.idNumber && props.itemIsExpanded[ins._id] &&
                            <h4 className="insurance-item-id">Id Number: {ins.idNumber}</h4>}

                        {ins.deductible && props.itemIsExpanded[ins._id] &&
                            <h4 className="insurance-item-deductible">Deductible: {ins.deductible}</h4>}

                        {ins.copay && props.itemIsExpanded[ins._id] &&
                            <h4 className="insurance-item-copay-title">Copay</h4>}
                        
                        {ins.copay && ins.copay.doctor && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-doctor">Doctor: {ins.copay.doctor}</h5>}

                        {ins.copay && ins.copay.specialist && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-specialist">Specialist: {ins.copay.specialist}</h5>}

                        {ins.copay && ins.copay.urgentCare && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-urgent">Urgent Care: {ins.copay.urgentCare}</h5>}

                        {ins.copay && ins.copay.emergency && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-emergency">Emergency Room: {ins.copay.emergency}</h5>}

                        {ins.copay && ins.copay.prescription.brandName && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-brand">Brand name prescription: {ins.copay.prescription.brandName}</h5>}

                        {ins.copay && ins.copay.prescription.generic && props.itemIsExpanded[ins._id] &&
                            <h5 className="insurance-item-copay-generic">Generic prescription: {ins.copay.prescription.generic}</h5>}

                        <FontAwesomeIcon
                            className="insurance-item-expand item-expand item"
                            icon={props.itemIsExpanded[ins._id] ? "angle-double-up" : "angle-double-down"}
                            size="2x"
                            id={ins._id}
                            onClick={(e) => props.expand(e)}
                        />

                        <Link to={{ pathname: `dashboard/form/insurance/${ins._id}`, state: { update: true, ins } }}>
                            <FontAwesomeIcon
                                icon="edit"
                                className="insurance-card-edit item-edit item"
                                size="2x"
                            />
                        </Link>
                       
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="Insurance card">
            <h2>Insurance Information</h2>
            <Link to={{pathname: '/dashboard/form/insurance', state: {edit: true, add: true}}} className="insurance-card-link" style={{textDecoration: "none"}}>
                <div className="insurance-card-link-container">
                    <p className="insurance-card-link-add">Click here to add Insurance!</p>
                </div>
            </Link>
        </div>
    )
};