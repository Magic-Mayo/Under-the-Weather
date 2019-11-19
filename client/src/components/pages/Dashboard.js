import React, { Component } from 'react';
import Symptoms from '../Symptom/Card';
// import MedicalHistory from "../Medical_History/MedicalHistory";
import Providers from "../Provider/Card";
import Contacts from "../Contact/Card";
import Insurance from "../Insurance/Card";
import FormContainer from './FormContainer';
// import Modal from '../Modal/modal'
import Nav from "../Nav";
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class Dashboard extends Component{
    state = {
        navOpen: false        
    }

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.isLoggedIn) {
			this.props.logIn();
		}
	}

    //function to show modal
    showModal = () =>{
        this.setState({
            show:true
        })
    }

    // change function to set state based on which component it comes from as well
    expand = e => {
        const {id} = e.currentTarget;
        this.setState({[id]: !this.state[id]})
    }

    deleteObject = props => {
        if(window.confirm("Are you sure you want to delete this information?")){ 
        Axios.delete(`/account/${props.card}/${props.route}/${this.props.userId}/${props._id}`).then(user=>{
            this.props.setUser(user.data);
            this.setState({show:false})
    })
}

    }

	toggleNav = (e) => this.setState({ navOpen: !this.state.navOpen });

	render() {
		if (!this.props.isLoggedIn) {
			return <Redirect to="/" />;
		}
		return (
			<div className="Dashboard">
				<Symptoms
					name={this.props.user.name}
					symptoms={this.props.user.symptomHistory}
					card="symptom"
					delete={this.deleteObject}
					route="deletesymptom"
					edit={this.editObject}
					expand={this.expand}
					itemIsExpanded={this.state}
				/>
				{/* <section className="container-right">
                Future use

                <MedicalHistory
                name={this.props.name}
                user={this.props.user}
                /> {' '}
				*/}
				<Providers
					name={this.props.user.name}
					providers={this.props.user.mediData.doctors}
					delete={this.deleteObject}
					card="provider"
					route="deleteprovider"
					edit={this.editObject}
					expand={this.expand}
					itemIsExpanded={this.state}
				/>
				<Contacts
					name={this.props.user.name}
					contact={this.props.user.emergencyContacts}
					delete={this.deleteObject}
					edit={this.editObject}
					expand={this.expand}
					itemIsExpanded={this.state}
					card="contact"
					route="deletecontact"
				/>
				<Insurance
					name={this.props.user.name}
					insurance={this.props.user.mediData.insurance}
					delete={this.deleteObject}
					edit={this.editObject}
					expand={this.expand}
					itemIsExpanded={this.state}
					card="insurance"
                    route="deleteinsurance"
                    modal={this.showModal}                
                    show={this.state.show} 
				/>
				{/* </section> */}
				<Nav
					navOpen={this.state.navOpen}
					toggleNav={this.toggleNav}
					userId={this.props.userId}
					user={this.props.user}
				/>
				{/* <Forms /> */}
				<Route path={`${this.props.match.path}/form/:formtype/:id?`}>
					<FormContainer
						userId={this.props.userId}
						setUser={this.props.setUser}
						user={this.props.user}
						handleLogIn={this.handleLogIn}
						navOpen={this.state.navOpen}
						toggleNav={this.toggleNav}
						isLoggedIn={this.props.isLoggedIn}
						updateItem={this.editObject}
					/>
				</Route>
			</div>
		);
	}
}

export default withRouter(Dashboard);
