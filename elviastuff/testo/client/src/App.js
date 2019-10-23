import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Symptoms from "./pages/Symptoms";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Testo</h2>
        </div><br></br>
        <div>
          <Symptoms />
        </div>
      </div>
    );
  }
}

export default App;
