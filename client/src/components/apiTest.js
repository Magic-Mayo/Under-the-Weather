import React from 'react';
import API from "../utils/API"

function Test() {

    
    // API.defaultSearch().then(res => (console.log(res.data.data)));
    // API.SearchLocation("az-mesa").then(res => (console.log(res)));
    API.SearchSpecialty("pediatrician", "az-mesa").then(res => (console.log(res.data.data)))
;    
    return (
        <div></div>
    )

}

export default Test;