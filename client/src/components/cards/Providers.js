import React from 'react';

export default function Providers(props) {
    return (
        <div className="Providers card">
            <h2>Medical Providers</h2>
            {props.providers.map(doc=>{
            return (<div key={doc._id} className="provider-wrapper">
                <h4 className="provider-name">{doc.name}</h4>
                {doc.doctorType && <p className="provider-title">{doc.doctorType}</p>}
                {doc.phone && <p className="provider-phone">Phone: {doc.phone}</p>}
                {doc.email && <p className="provider-email">Email: {doc.email}</p>}
            </div>)
            })}
        </div>
    );
}