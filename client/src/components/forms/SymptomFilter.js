import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function SymptomFilter(props) {
    console.log(props)
    return (
        <div className="filter-form-container">
            <form className="filter-form">
                {props.data.options.map(option => {
                    return (
                        <div className="filter-form-input-wrapper">
                            <select name={option.name} id={option.name}className="filter-form-input">
                                <option value="" selected disabled hidden>
                                    {option.name}
                                </option>
                                {option.choices.map(type => {
                                    return (
                                        <option value={type}>{type}</option>
                                    )
                                })}
                            </select>
                            <FontAwesomeIcon icon="angle-down" className="down-arrow"/>
                        </div>
                    )
                })}
                <button type="button" className="filter-form-btn">
                    <span>filter</span>
                    <FontAwesomeIcon icon="filter" className="filter" />
                </button>
            </form>
        </div>
    )
}

export default SymptomFilter


