import React from "react";


function doctors(props) {
    return(
        <div>
          <p>Name: {props.firstName}, {props.lastName}</p>
          <p>Bio: {props.bio}</p>
          <p>Practices: {props.practices}</p>
        </div>
    )
}
export default doctors