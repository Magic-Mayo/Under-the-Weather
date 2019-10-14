import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Nav(props) {
    function toggleMenu() {
        props.menu.isExpanded = !props.menu.isExpanded;
        console.log(props.menu.isExpanded)
        this.setState(
            {isExpanded: props.menu.isExpanded}
        )
    }
    let rotated = props.menu.isExpanded ? "expand rotate" : "expand"

    return (

        <div className="Nav">
            <div className="expand-container" onClick={toggleMenu}>
                <FontAwesomeIcon icon="plus" className={rotated} />
            </div>
            <div className="expand-items-container">
                <a href="/" className="expand-items">provider</a>
                <a href="/" className="expand-items">contact</a>
                <a href="/" className="expand-items">symptoms</a>
                <a href="/" className="expand-items">insurance</a>
            </div> 
        </div>
    )
}

export default Nav