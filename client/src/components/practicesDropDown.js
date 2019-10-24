import React from "react";

function dropDown(props){
    return(
<select>
  <option value="">{props.children}</option>
 
</select>
    )
}
export default dropDown