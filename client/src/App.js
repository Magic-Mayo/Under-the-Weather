import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

    state = {
        name: '',
        password: ''
    }


    facebook = (e) => {
        e.preventDefault();
        axios.get('/auth/facebook').then(user=>console.log(user))
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
        console.log(this.state)
    }

    email = () => {
        axios.get('/verify/email')
    }


    render() {
        return (
            <div className="App">
                {/* <form id='form'>
                    <input name='name' placeholder='name' onChange={this.handleChange} value={this.state.name}></input>
                    <input name='password' placeholder='password'onChange={this.handleChange} value={this.state.password}></input>
                    <button type='submit' onClick={this.facebook}>Facebook login</button>
                </form> */}
                <a href='http://localhost:3001/auth/facebook'>Facebook</a>
            </div>
        );
    }
}

export default App;