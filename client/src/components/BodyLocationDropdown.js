import React from "react";
import { Dropdown } from 'react-bootstrap';

function BodyLocationDropdown(props) {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
         Select Body Location
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">{props.name}</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    );
}

export default BodyLocationDropdown;