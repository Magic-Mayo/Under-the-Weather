import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SymptomFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Severity: '',
            Type: '',
            Symptoms: '',
            Time: '',
            Diagnosis: ''
        }
        this.handleChange = this.handleChange.bind(this);
      }


    handleChange = (e) => {
        console.log(e)
        // const name = e.target.value;

        // this.setState({[name]: value})
    }

    render() {
        return (
            <div className="filter-form-container">
                <form className="filter-form">
                    {this.props.data.options.map((option, i) => {
                        return (
                            <div key={`option-${i}`} className="filter-form-input-wrapper">
                                <select name={option.name} id={option.name} onClick={this.handleChange} className="filter-form-input">
                                    <option hidden>
                                        {option.name}
                                    </option>
                                    {option.choices.map((type,j) => {
                                        return (
                                            <option key={`type-${j}`} value={type} >{type}</option>
                                        )
                                    })}
                                </select>
                                <FontAwesomeIcon icon="sort-down" className="down-arrow"/>
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
}

export default SymptomFilter


