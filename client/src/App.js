import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

    facebook = () => {
        axios.get('/auth/facebook')
    }

    render() {
        return (
            <div className="App">
                <p onClick={this.facebook}>Facebook login</p>
            </div>
        );
    }
}

export default App;