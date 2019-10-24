import axios from "axios";
require('dotenv').config()

const APIKEY = process.env.REACT_APP_API_KEY;


export default {
  search: function(query) {
    return axios({
      "method":"GET",
      "url":"https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms/" + query + "/man",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
      "x-rapidapi-key":APIKEY,
      },"params":{
      "language":"en-gb"
      }
      })
    }

};