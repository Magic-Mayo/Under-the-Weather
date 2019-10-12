import axios from "axios";
const BASEURL = "https://api.betterdoctor.com/2016-03-01/doctors?";
const specialty = "specialty_uid="
const location = "&location="
const userLocation = "&user_location="
const APIKEY = "&user_key=f320e780451ce257e7d2c4d42220f6ea";
const betweenLocation = "%2C"

export default {
  SearchLocation: function(loc) {
    return axios.get(BASEURL + location + loc + APIKEY);
  },
  SearchSpecialty: function(spec, lat, long){
    return axios.get("https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=" +spec + "&location="+ lat + "%2C" + long + "%2C25&user_location=" + lat + "%2C" + long + "&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea")
  },
  defaultSearch: function(){
    return axios.get(BASEURL+location+APIKEY)
  }
};

// https://api.betterdoctor.com/2016-03-01/doctors?location=az-phoenix&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea

// https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=podiatrist&location=az-phoenix&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea
//https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=cardiologist&location=33.343897600000005%2C-111.74952959999999%2C25&user_location=33.343897600000005%2C-111.74952959999999&skip=0&limit=10&user_key=f320e780451ce257e7d2c4d42220f6ea