import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
// import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    
    api.postLogin(data)
    .then(result => {
      this.setState({
        email: "",
        password: "",
        // message: `Your people '${this.state.firstname} ${this.state.lastname}' has been modified`
      })
      if (result.success)
        this.props.history.push("/people")
      else
        this.setMessage("Login failed")
    })
    .catch(err => {
    })
  }

  setMessage(message, duration = 2000) {
    this.setState({ message })
    setTimeout(() => {
      this.setState({
        message: null
      })
    }, duration)
  }
  
  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <form>
          email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
          password: <input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} /> <br/>
          <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Enter Orion</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "yellow",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default Login;
