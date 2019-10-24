import axios from 'axios';
const BASEURL = 'https://api.betterdoctor.com/2016-03-01/doctors?';
const specialty = 'specialty_uid=';
const location = '&location=';
const DAPIKEY = process.env.DR_REACT_API_KEY;
const APIKEY = process.env.REACT_APP_API_KEY;
require('dotenv').config();

export default {
	SearchLocation: function(loc) {
		return axios.get(BASEURL + location + loc + DAPIKEY);
	},
	SearchSpecialty: function(spec, lat, long) {
		return axios.get(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${spec}&location=${lat},${long},5&user_location=${lat},${long}&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea`);
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
				'x-rapidapi-key': APIKEY
			},
			params: {
				language: 'en-gb'
			}
		});
	}
};
