import React from 'react';
import './App.css';
// E's Stuff
// import API from "./utils/API";
const axios = require('axios');
// E's Stuff
require('dotenv').config()

// const facebook = () => {
//     axios.get('/auth/facebook')
// }

const BASEURL = "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms";
const APIKEY = process.env.REACT_APP_API_KEY;

axios({
  "method":"GET",
  "url":BASEURL,
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
  "x-rapidapi-key":APIKEY
  },"params":{
  "format":"json",
  "language":"en-gb"
  }
  })
  .then((response)=>{
    console.log(response)
    console.log(response.data[0].Name)
    console.log(
      response.data.forEach(item => console.log(item.Name))
    )
  })
  .catch((error)=>{
    console.log(error)
  })


 



function App() {

  return (
    // <div className="App">
    //     <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" onClick={facebook}>Facebook login</div>
    // </div>

    <div>
      YIKES!

    </div>
  );
}

export default App;
