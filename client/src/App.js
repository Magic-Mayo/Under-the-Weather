import React from 'react';
import './App.css';
import Test from "../src/components/apiTest"

const axios = require('axios');

const facebook = () => {
    axios.get('/auth/facebook')
}

function App() {

  return (
    <div className="App">
      <Test />
        <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" onClick={facebook}>Facebook login</div>         
    </div>
  );
}

export default App;
