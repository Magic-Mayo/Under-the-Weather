import React from 'react'
import FormContainer from '../pages/FormContainer'

export default function ContactLink(props) {
    return (
        <div className="ContactLink">              
            <FormContainer
            setUser={props.setUser}
            userId={props.userId}
            isLoggedIn={props.isLoggedIn}
            formType="Contact"
            menuState={props.menuState}
            toggleMenu={props.toggleMenu}
            name={props.name}/>
        </div>
    )
}