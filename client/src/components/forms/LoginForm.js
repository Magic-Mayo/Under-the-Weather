import React, { Component } from 'react'

export default class LoginForm extends Component {
    
    state = {
        username: '',
        password: ''
    }

    handleInput = (e) => {
        const {name, value} = e.target
        console.log(name,value)
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className={this.props.classNames}>
                <form>
                    <input name='username' autoComplete='username' onChange={this.handleInput} value={this.state.username} placeholder='Enter User Name'></input>
                    <input name='password' type='password' onChange={this.handleInput} autoComplete='current-password' value={this.state.password} placeholder='Enter Password'></input>
                    <button onClick={(e)=>{e.preventDefault(); this.props.handleLogIn({credentials: this.state})}}>Submit</button>
                </form>
            </div>
        )
    }
}
