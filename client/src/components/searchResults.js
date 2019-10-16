import React from "react";
import PDropDown from "../components/practicesDropDown"


function doctors(props) {
  return (
    <div>
      <p>Name: {props.firstName}, {props.lastName}</p>
      <p>Bio: {props.bio}</p>
      <p>Practices:  <select>
        <option value="">Select an Option</option>
        <option value="">{props.practices}</option>

      </select></p>
    </div>
  )
}
export default doctors