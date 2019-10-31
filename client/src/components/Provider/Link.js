import React from 'react';
import FormContainer from '../pages/FormContainer';

export default function ProviderLink(props) {
    return (
        <div className="ProviderLink">
            <FormContainer 
            userId={props.userId}
            isLoggedIn={props.isLoggedIn}
            formType={props.searchOrManual === "search" ? 
                "Provider":"Manual"}
            setUser={props.setUser}
            menuState={props.menuState}
            toggleMenu={props.toggleMenu}
            />
        </div>
    );
}