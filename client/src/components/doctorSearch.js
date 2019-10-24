import React, { Component } from 'react';
import API from "../utils/API";
import DrInput from "../components/searchBox";
import DoctorResults from "../components/searchResults";
import PDropDown from "../components/practicesDropDown"



class Doctor extends Component {
    state = {
        doctors: [],
        search: "",
        latitude: "",
        longitude: "",
        results: []
    }
    componentDidMount() {
        this.userLocation()
    }

    userLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        },

            success = (pos) => {
                const crd = pos.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
                this.setState({ longitude: crd.longitude, latitude: crd.latitude })


            },

            error = (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }


    handleInputChange = event => {
        this.setState({ search: event.target.value });
    };


    drSearch = event => {
        event.preventDefault();
        API.SearchSpecialty(this.state.search, this.state.latitude, this.state.longitude)
            .then(res => {
                console.log(res.data.data)
                this.setState({ results: res.data.data });
            });

    }


    render() {
        return (
            <div>
                <DrInput
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    drSearch={this.drSearch}
                    handleInputChange={this.handleInputChange}
                />
                {this.state.results.map(res => (
                      <DoctorResults
                      src={res.profile.image_url}
                      firstName ={res.profile.first_name}
                      lastName = {res.profile.last_name} 
                      bio ={res.profile.bio}                                                                
                      practices = {res.practices}
                     
                      />
                      ))}
                     
              

            </div>
        )
    }

}
export default Doctor