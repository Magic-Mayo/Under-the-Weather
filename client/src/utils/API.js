import axios from "axios";
require('dotenv').config()

const BASEURL = "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms";
const APIKEY = process.env.REACT_APP_API_KEY;


export default {
  search: function() {
    return axios.get({
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
    })
    .catch((error)=>{
      console.log(error)
    })
}

};