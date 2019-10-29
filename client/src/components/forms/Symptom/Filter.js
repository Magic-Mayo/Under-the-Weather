import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Severity: '',
            Type: '',
            Symptoms: '',
            Time: '',
            // Diagnosis: '',

            inputs: [
                {
                    name: 'Severity',
                    active: false,
                },
                {
                    name: 'Type',
                    active: false,
                },
                {
                    name: 'Symptoms',
                    active: false,
                },
                {
                    name: 'Time',
                    active: false,
                },
                // {
                //     name: 'Diagnosis',
                //     active: false,
                // }
            ]
        }
      }


    setDisplay = (e,nameClicked) => {
        e.persist()

        this.state.inputs.map((input, i) => {
            const {name, active} = input

            if (input.name === nameClicked) {
                this.setState((state) => {
                    return state.inputs[i].active = !state.inputs[i].active
                })
            } else {
                this.setState((state) => {
                    return state.inputs[i].active = false
                })
            }
        })
    }

    render() {
        return (
            <div className="filter-form">
                {this.props.data.options.map((option, i) => {
                    return (
                        <ul key={`option-${i}`} className={`filter-form-input`} onClick={(e) => this.setDisplay(e,option.name)} value={option.name}>
                                <p >
                                    {option.name}
                                </p>
                                {option.choices.map((type,j) => {
                                    return (
                                        <li key={`type-${j}`} value={type} className={
                                            !this.state.inputs[i].active ? 'invisible' : ''
                                        } onClick={this.handleListItem}>{type}</li>
                                    )
                                })}
                            <FontAwesomeIcon icon="sort-down" className="down-arrow"/>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

export default Filter;