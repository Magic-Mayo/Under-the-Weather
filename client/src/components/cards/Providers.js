import React from 'react';



function Providers(props) {
    return (
        <div className="Providers card">
            <h2>Medical Providers</h2>
            <div className="provider-wrapper">
                <h4 className="provider-name">John Scott</h4>
                <p className="provider-title">Dentist</p>
                <p className="provider-phone">
                    Phone: 
                    <a href="/">123-456-7899</a>
                </p>
                <p className="provider-phone">
                    Email: 
                    <a href="/">jscott@doctor.phd</a>
                </p>
            </div>
        </div>
    );
}

export default Providers;