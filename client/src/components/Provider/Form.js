import React, { Component } from 'react';
import Search from './Search';
import Axios from 'axios';
import moment from 'moment';
import ManualEntry from './ManualEntry';

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
        errors:'',
        // searchActive: true
    };

    state = {
        ...this.initialState,
        entry: false
    };

    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        const {state} = this.props.location;
        if(state && state.provider){
            const provider = state.provider
            this.setState({
                name: provider.name || '',
                type:  provider.doctorType || '',
                insurance: provider.insurance || '',
                address:  provider.address || '',
                city:  provider.city || '',
                state:  provider.state || '',
                zip: provider.zip || '',
                phone:  provider.phone || '',
                entry: this.props.location.state.entry
            })
        } else if (state && !state.provider){
            this.setState({entry: state.entry})
        }
    }
    
    handleInput = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

	toggleOption = (e) => {
		e.persist();
        const active = e.target.className.includes('search') ? true : false;
        this.setState({
            searchActive: active,
        })
    };

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
                phone: this.state.phone,
                createdAt: moment()
            }
        };

        if(this.state.name !== ''){
        Axios.post('/account/provider', provider).then(user=>{
            this.props.setUser(user.data);
            this.setState(this.initialState)
        });}
        else{           
            this.setState({errors: "This field required"});
        };
    };

    entry = () => {
        this.setState({entry: !this.state.entry})
    }

	render() {
        // console.log("THIS IS THE PROVIDER FORM PROPS",this.props)
		return (
			<div className="provider-form-container">
                {!this.state.entry ?
					<Search
						search={this.state.search}
						submitProvider={this.submitProvider}
                        handleInput={this.handleInput}
                        entry={this.entry}
					/>
                    :
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
                        errors={this.state.errors}
                        entry={this.entry}
					/>
                }
            </div>
		);
	}
}
