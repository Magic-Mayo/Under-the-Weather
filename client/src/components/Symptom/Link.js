import React from 'react';
import FormContainer from '../pages/FormContainer';

export default function SymptomLink(props) {
    return (
        <div className="SymptomLink">
            <FormContainer 
                isLoggedIn={props.isLoggedIn} 
                formType="Symptom"
                userId={props.userId}
                menuState={props.menuState}
                toggleMenu={props.toggleMenu}
            />
        </div>
    )
}
