import React, {Component} from 'react';
import API from "../utils/API"
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

class Test extends Component{
    state ={
        longitude: "aaa",
        latitude: "bbb"

    }
   
   componentDidMount(){
       this.findLocation();
    //    .then(res => (this.setState({longitude: res.crd.longitude, latitude: res.crd.latitude})));
    API.SearchLocation("az-mesa").then(res => (console.log(res)));
   }
   
    
    // API.defaultSearch().then(res => (console.log(res.data.data)));
    // API.SearchSpecialty("pediatrician", "az-mesa").then(res => (console.log(res.data.data)));

    findLocation = (pos, err) =>{
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
        this.setState({longitude: crd.longitude, latitude: crd.latitude})
             
      
        },
      
      error = (err) =>{
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options); 
      
    };    

render(){

    return (
        <div>
            <h1>
                {this.state.latitude}
                <span>   </span> 
                {this.state.longitude}
            </h1>
        </div>
        )
        
    }
}

export default Test;