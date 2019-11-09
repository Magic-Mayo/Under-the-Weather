import React from 'react'
import FormContainer from '../pages/FormContainer'

export default function InsuranceLink(props) {
    return (
        <div className="InsuranceLink">
            <FormContainer 
                isLoggedIn={props.isLoggedIn}
                getNewUserInfo={props.getNewUserInfo}
                userId={props.userId}
                name={props.name}
                menuState={props.menuState}
                toggleMenu={props.toggleMenu}
                formType="Insurance" />
        </div>
    )
}
