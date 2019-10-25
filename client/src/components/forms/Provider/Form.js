import React, { Component } from 'react';
import Search from './Search';
import ManualEntry from './ManualEntry';
import { Link } from 'react-router-dom';
import Axios from 'axios';
export default class ProviderForm extends Component {
    initialState = {
        userId: this.props.userId,
        search: '',
        name:  '',
        type:  '',
        insurance: '',
        address:  '',
        city:  '',
        state:  '',
        zip: '',
        phone:  '',
        searchActive: true 
    }

    state = {
        ...this.initialState
    }

    handleInput = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

	toggleOption = (e) => {
		e.persist();

        const active = e.target.className.includes('search') ? true : false;
    }

    submitProvider = () => {
        const provider = {
            userId: this.state.userId,
            route: 'addprovider',
            provider: {
                name: this.state.name,
                doctorType: this.state.type,
                insurance: this.state.insurance,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                phone: this.state.phone
            }
        };

        Axios.post('/account/provider', provider).then(user=>{
            this.props.setUser(user);
            this.setState(this.initialState)
        });
    }

	render() {
        console.log(this.props)
		return (
			<div className="provider-form-container">
				<div className="provider-form-options">
					<button type="button" className="provider-form-options-search" onClick={this.toggleOption}>
						Search By Specialty
					</button>
					<button type="button" className="provider-form-options-manual" onClick={this.toggleOption}>
						Enter Info Manually
					</button>
				</div>
				{this.state.searchActive ? (
					<Search
						search={this.state.search}
						submitProvider={this.submitProvider}
						handleInput={this.handleInput}
					/>
				) : (
					<ManualEntry
						submitProvider={this.submitProvider}
						handleInput={this.handleInput}
						name={this.state.name}
						insurance={this.state.insurance}
						type={this.state.type}
						address={this.state.address}
						phone={this.state.phone}
						city={this.state.city}
						state={this.state.state}
						zip={this.state.zip}
					/>
				)}
				<div className="provider-form-submit-container">
					{/* <button type="button" className="provider-form-submit">
                        Add Provider
                    </button> */}
					<Link to="/dashboard" className="closeForm">
						<button type="button" className="provider-form-close">
							Close Form X
						</button>
					</Link>
				</div>
            </div>
		);
	}
}
