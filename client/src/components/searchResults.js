import React from "react";
import PDropDown from "../components/practicesDropDown"


function doctors(props) {
  return (
    <div>
      <img src={props.src} alt="Smiley face" height="42" width="42"></img>
      <p>Name: {props.firstName}, {props.lastName}</p>
      <p>Bio: {props.bio}</p>
      <p>Practices:  <select>
        <option value="">Office Locations</option>
        {props.practices.map(res => 
        <option value="">{res.name}
        { " Address: " +res.visit_address.street + " " + res.visit_address.city + " " + res.visit_address.state + " " + res.visit_address.zip}
        </option>)}

      </select></p>
    </div>
  )
}
<<<<<<< HEAD
export default doctors
=======
export default doctors
>>>>>>> 3a90a198b1f710220929d5441db9132b09316fc4
