import React, { Component } from 'react';
import Search from './Search';
import Axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class ProviderForm extends Component {
    initialState = {
        userId: this.props.userId,
        Drsearch:'',
        search: '',
        name:  '',
        type:  '',
        insurance: '',
        address:  '',
        city:  '',
        state:  '',
        zip: '',
        phone:  '',
        email: '',
        website: '',
        errors:'',
        page: 1
    };

    state = {
        ...this.initialState,
        entry: false
    };

    componentDidMount() {
        if(this.props.navOpen){
            this.props.toggleNav();
        }
        if(this.props.location.state){
            const {state} = this.props.location;
            const {provider} = state
            if(state.provider){
                this.setState({
                    name: provider.name || '',
                    type:  provider.doctorType || '',
                    insurance: provider.insurance || '',
                    address:  provider.address.streetAddress || '',
                    city:  provider.address.city || '',
                    state:  provider.address.state || '',
                    zip: provider.address.zip || '',
                    phone:  provider.phone || '',
                    entry: this.props.location.state.entry
                })
            }

            if (state.signup){
                this.setState({signup: true})
            }

            if (state.update){
                this.setState({update: true})
            }

            if (state.entry){
                this.setState({entry: true})
            }
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
                this.setState(this.initialState);
                this.props.history.goBack();
            });
        }
        else{           
            this.setState({errors: "This field required"});
        };
    };

    update = id => {
        const updatedData = {
            route: "updateprovider",
            provider: {"data.mediData.doctors.$": {
                name: this.state.name,
                doctorType: this.state.type,
                insurance: this.state.insurance,
                phone: this.state.phone,
                email: this.state.email,
                website: this.state.website,
                address: {
                    streetAddress: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip
                },
                updatedAt: moment()
            }},
            key: "data.mediData.doctors._id",
            id: id
        }
        console.log(updatedData)
        return Axios.put('/account/provider', updatedData).then(user=>{
            console.log(user)
            this.props.setUser(user.data);
            this.props.history.goBack();
        })
    }

    entry = () => {
        this.setState({entry: !this.state.entry})
    }

    nextPage = () => this.setState({page: this.state.page + 1})
    
    prevPage = () => this.setState({page: this.state.page - 1})

    setSearchResults = () => {
        this.setState({searchResults: true})
    }

	render() {
        // console.log("THIS IS THE PROVIDER FORM PROPS",this.props)
		return (
			<div className="provider-form-container form">
                {this.state.entry ?
                    <>
                        <h2 className="provider-form-title">{this.state.update ? "Update ": "Enter "}your Doctor's information below</h2>
                    </>
                :
                    <>
                        <h1 className="provider-form-title form-title">What type of doctor are you looking for?</h1>
                        <h3 className="provider-form-subtitle">We'll Search Around The Area For You</h3>
                    </>
                }
                {!this.state.entry && <hr></hr>}

                {/* {!this.state.entry ?
					<Search
						search={this.state.search}
						submitProvider={this.submitProvider}
                        handleInput={this.handleInput}
                        entry={this.state.entry}
                        handleEntry={this.entry}
                        searchResults={this.state.searchResults}
                        setSearchResults={this.setSearchResults}
                        Drsearch={this.state.Drsearch}
					/>
                    : */}
                    {this.state.page === 1 ?
                        <FirstPage
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
                            page={this.state.page}
                            nextPage={this.nextPage}
                            update={this.state.update}
                        />
                    :
                        <SecondPage
                        submitProvider={this.submitProvider}
                        handleInput={this.handleInput}
                        errors={this.state.errors}
                        entry={this.entry}
                        page={this.state.page}
                        prevPage={this.prevPage}
                        update={this.state.update}
                        />
                    }
                <div className="provider-form-submit-container">
                    {this.state.signup &&
                        <Link to={{pathname: "/", state: {details: true, currentPage: 4}}}>
                            <button type="button" className="back-to-details button">
                                Back to Details Page
                            </button>
                        </Link>}
                    {this.state.entry &&
                        <button
                        type="button"
                        className="provider-form-next"
                        onClick={this.state.page === 1 ? this.nextPage : this.prevPage}>
                            {this.state.page === 1 ? "Next Page" : "Previous Page"}
                        </button>}

                    {this.state.entry &&
                        <button
                        type="button"
                        className="provider-form-submit"
                        onClick={this.state.update? () => this.update(this.props.match.params.id) : this.submitProvider}>
                            {this.state.update ? "Update" : "Submit"}
                        </button>}
                </div>
            </div>
		);
	}
}

const FirstPage = props => {
    if(props.navOpen){
        props.toggleNav();
    }
    return (
        <div className="provider-form-manual-entry">
            {/* {!props.update &&
                <>
                    <h5 className="form-subtitle">To run a search for a doctor,{' '}</h5>
                    <h5 className="link" onClick={props.entry}>Click here</h5>
                </>
            } */}
            <hr></hr>
            <form className="provider-form-manual-entry-grid">
                <div className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-name">
                    <label htmlFor="doctorName"><span>*</span>Doctor's Name:</label>
                    <input
                    name="name"
                    placeholder="Dr. John Smith"
                    type="text"
                    value={props.name}
                    onChange={props.handleInput}
                    required
                    />
                    <span style={{color: "red", fontSize: "18px"}}>{props.errors}</span>
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-specialty">
                    <label htmlFor="type">Specialty:</label>
                    <input
                    name="type"
                    placeholder="Pediatrician"
                    type="text"
                    value={props.type}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-address">
                    <label htmlFor="address">Address:</label>
                    <input
                    name="address"
                    placeholder="123 W Main St"
                    type="text"
                    value={props.address}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-city">
                    <label htmlFor="city">City:</label>
                    <input
                    name="city"
                    placeholder="Phoenix"
                    type="text"
                    value={props.city}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-state">
                    <label htmlFor="state">State:</label>
                    <input
                    name="state"
                    placeholder="AZ"
                    minLength="2"
                    maxLength="2"
                    type="text"
                    value={props.state}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-zip">
                    <label htmlFor="zip">ZIP:</label>
                    <input
                    name="zip"
                    placeholder="85008"
                    type="number"
                    min="00000"
                    max="99999"
                    value={props.zip}
                    onChange={props.handleInput}
                    required
                    />
                </div>
            </form>
        </div>
    )
}

function SecondPage(props){
    return (
        <div className="provider-form-manual-entry">
            <hr></hr>
            <form className="provider-form-manual-entry-grid">
                <div className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-email">
                    <label htmlFor="email">Doctor's Email:</label>
                    <input
                    name="email"
                    placeholder="Dr.JohnSmith@bcbs.com"
                    type="text"
                    value={props.email}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-website">
                    <label htmlFor="email">Doctor's Website:</label>
                    <input
                    name="website"
                    placeholder="DrJohnSmith.com"
                    type="text"
                    value={props.website}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-insurance">
                    <label htmlFor="insurance">Accepted Insurance:</label>
                    <input
                    name="insurance"
                    placeholder="Cigna"
                    type="text"
                    value={props.insurance}
                    onChange={props.handleInput}
                    required
                    />
                </div>
                <div
                className="input-container provider-form-manual-entry-grid-item provider-form-manual-entry-grid-item-phone">
                    <label htmlFor="doctorName">Phone Number:</label>
                    <input
                    name="phone"
                    placeholder="480-963-8741"
                    type="number"
                    value={props.phone}
                    onChange={props.handleInput}
                    required
                    />
                </div>
            </form>
        </div>

    )
}