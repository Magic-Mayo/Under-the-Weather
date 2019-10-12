import React from 'react';



function drInput(props) {
    return (      
        <div>
        <p>
          Hello {props.latitude} {props.longitude}
        </p>
        <form className="form">
          <input
            value={props.search}
            name="Dr search"
            onChange={props.handleInputChange}
            type="text"
            placeholder="cardiologist"
          />
         
         
          <button type ="submit" onClick ={props.drSearch} >Submit</button>
        </form>
      </div>
    );
    }

    export default drInput