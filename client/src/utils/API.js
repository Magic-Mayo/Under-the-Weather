import axios from 'axios';
require('dotenv').config();
const BASEURL = 'https://api.betterdoctor.com/2016-03-01/doctors?';
// const specialty = 'specialty_uid=';  
const location = '&location=';
const DAPIKEY = process.env.REACT_APP_DR_API_KEY;
// const APIKEY = process.env.REACT_APP_API_KEY;

export default {
	SearchLocation: function(loc) {
		return axios.get(BASEURL + location + loc + DAPIKEY);
	},
	SearchSpecialty: function(spec, lat, long) {	
		return axios.get(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${spec}&location=${lat},${long},5&user_location=${lat},${long}&skip=0&limit=10&user_key=${DAPIKEY}`);
  },
	defaultSearch: function() {
		return axios.get(BASEURL + location + DAPIKEY);
	},

	search: function(query) {
		return axios({
			method: 'GET',
			url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms/' + query + '/man',
			headers: {
				'content-type': 'application/octet-stream',
				'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com',
				'x-rapidapi-key': DAPIKEY
			},
			params: {
				language: 'en-gb'
			}
		});
	}
};
