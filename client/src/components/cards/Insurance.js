import React from 'react';

export default function InsuranceCard(props) {

    return(
        <div className="Insurance card">
        <h2>Insurance Information</h2>
        {props.user.mediData.insurance.map(ins=>(
            <div className="Insurance card" key={ins._id}>
                <h3>{ins.provider}</h3>
                <h4>{ins.insuranceType}</h4>
                {ins.groupNumber && <h4>Group Number: {ins.groupNumber}</h4>}
                {ins.idNumber && <h4>Id Number: {ins.idNumber}</h4>}
                {ins.deductible && <h4>Deductible: {ins.deductible}</h4>}
            </div>
        ))}
            </div>
    )
};