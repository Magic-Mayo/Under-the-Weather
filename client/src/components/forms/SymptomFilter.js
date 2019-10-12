import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function SymptomFilter(props) {
    console.log(props);
    return (
        <div className="filter-form-container">
            <form className="filter-form">
                <div className="filter-form-input-wrapper">
                    <select name="type" id="type" className="filter-form-input">
                        {props.data.types.map(type => {
                            return (
                                <option value={type}>{type}</option>
                            )
                        })}
                    </select>
                    <FontAwesomeIcon icon="angle-down" class="down-arrow"/>
                </div>
            </form>
        </div>
    )
}

export default SymptomFilter