import React from 'react';


function Contacts(props) {
    return (
        <div className="Contacts card">
            <h2>Emergency Contacts</h2>
            {props.data}
        </div>
    );
}

export default Contacts;