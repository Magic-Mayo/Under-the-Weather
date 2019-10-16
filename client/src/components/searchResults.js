import React from "react";
import PDropDown from "../components/practicesDropDown"


function doctors(props) {
  return (
    <div>
      <p>Name: {props.firstName}, {props.lastName}</p>
      <p>Bio: {props.bio}</p>
      <p>Practices:  <select>
        <option value="">Office Locations</option>
        {props.practices.map(res => 
        <option value="">{res.name}
        {res.name.address}
        </option>)}

      </select></p>
    </div>
  )
}
export default doctors