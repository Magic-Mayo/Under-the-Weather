import React from "react";
import { ListGroup } from 'react-bootstrap';

function ResultList(props) {
  return (
    <ListGroup defaultActiveKey="#link1">
    {props.results.map(result => (
           <ListGroup.Item action href="#link1">
           {result.Name}
         </ListGroup.Item>
    ))}
     
  </ListGroup>
  );
}

export default ResultList;