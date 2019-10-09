import axios from "axios";
const BASEURL = "https://api.betterdoctor.com/2016-03-01/doctors?";
const specialty = "specialty_uid="
const location = "&location="
const APIKEY = "&user_key=f320e780451ce257e7d2c4d42220f6ea";
const def = "az-phoenix"

export default {
  SearchLocation: function(loc) {
    return axios.get(BASEURL + location + loc + APIKEY);
  },
  SearchSpecialty: function(spec, loc){
    return axios.get(BASEURL + specialty + spec + location + loc + APIKEY)
  },
  defaultSearch: function(){
    return axios.get(BASEURL+location+def+APIKEY)
  }
};

// https://api.betterdoctor.com/2016-03-01/doctors?location=az-phoenix&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea

// https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=podiatrist&location=az-phoenix&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea
