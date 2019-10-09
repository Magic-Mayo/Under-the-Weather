import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

// if (window.location.href.split('?')[1] && window.location.href.split('?')[1].substring(0,4) === 'code'){
//     axios.get(`/login/${window.location.href.split('?')[1]}`).then(async user=>{
//         const newUser = await user;
//         console.log(newUser)
//     })

// }

class App extends Component {

    state = {
        name: '',
        password: ' '
    }

    facebook = (e) => {
        e.preventDefault();
        console.log('hi');
        axios.get('/auth/facebook').then(user=>console.log(user))
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
        console.log(this.state)
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