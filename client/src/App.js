// import React from 'react';
import React, { Component } from "react";
import './App.css';
import bodyparts from "./bodyparts.json";

// E's Stuff
// import API from "./utils/API";
// const axios = require('axios');
// require('dotenv').config()


// const BASEURL = "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms";
// const APIKEY = process.env.REACT_APP_API_KEY;

// axios({
//   "method":"GET",
//   "url":BASEURL,
//   "headers":{
//   "content-type":"application/octet-stream",
//   "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
//   "x-rapidapi-key":APIKEY
//   },"params":{
//   "format":"json",
//   "language":"en-gb"
//   }
//   })
//   .then((response)=>{
//     console.log(response)
//     console.log(response.data[0].Name)
//     console.log(
//       response.data.forEach(item => console.log(item.Name))
//     )
//   })
//   .catch((error)=>{
//     console.log(error)
//   })


  // class App extends Component {
  //   componentDidMount() {
  //     fetch('http://jsonplaceholder.typicode.com/users')
  //     .then(res => res.json())
  //     .then((data) => {
  //       this.setState({ contacts: data })
  //     })
  //     .catch(console.log)
  //   }
  


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    bodyparts
  };

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Steve Jobs</h5>
          <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
          <p class="card-text">Stay Hungry, Stay Foolish</p>
        </div>
      </div>

    );
  }
}

export default App;
