import React, { Component } from "react";
// import BodyLocationDropdown from "./BodyLocationDropdown"
import API from "../utils/API";
import bodyparts from "../bodyparts.json";
import { Dropdown } from 'react-bootstrap';

class SymptomSearchContainer extends Component {
    state = {
        bodyparts,
        results: null
      };

      handleFormSubmit = event => {
          console.log(event.target.id);
          // this.searchSymptom(event.target.id);
          API.search(event.target.id)
          .then(res => {this.setState({ results: res.data});console.log(this.state.results)})
          .catch(err => console.log(err));
      };

      // searchSymptom = query => {
      //   API.search(query)
      //     .then(res => this.setState({ results: res.data}))
      //     .catch(err => console.log(err));
      // };
    
    render() {
        return (
        <div>
        {this.state.bodyparts.map(bodyparts => (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic"
        key={bodyparts.ID} >
        {bodyparts.Name}
        </Dropdown.Toggle>

        <Dropdown.Menu> 
            {bodyparts.Sublocation.map(bodyparts => (
            <Dropdown.Item 
            id={bodyparts.ID}
            key={bodyparts.ID}
            onClick={this.handleFormSubmit}
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