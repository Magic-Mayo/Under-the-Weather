import React, { Component } from "react";
// import BodyLocationDropdown from "./BodyLocationDropdown"
// import API from "../utils/API";
import bodyparts from "../bodyparts.json";
import { Dropdown } from 'react-bootstrap';

class SymptomSearchContainer extends Component {
    state = {
        bodyparts
      };

      handleInputChange = event => {
          console.log(event.target.id)
      }
    

    render() {
        return (
        <div>
        {this.state.bodyparts.map(bodyparts => (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {bodyparts.Name}
        </Dropdown.Toggle>

        <Dropdown.Menu> 
            {bodyparts.Sublocation.map(bodyparts => (
            <Dropdown.Item 
            id={bodyparts.ID}
            onClick={this.handleInputChange}
            >
                {bodyparts.Name}
             </Dropdown.Item>
           ))}
        </Dropdown.Menu>
      </Dropdown>
       ))}
        </div>
            );
    }
}



export default SymptomSearchContainer;