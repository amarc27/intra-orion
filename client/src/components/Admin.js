import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
// import './Admin.css';


class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      email: "",
      message: null
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
      firstname: this.state.firstname,      
      email: this.state.email,
    }

    api.postPeople(data)
      .then(result => {
        this.setState({
          firstname: "",
          email: "",
          message: `The invitation for '${this.state.firstname}' has been sent`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000)
      })
      .catch(err => {
      })
  }
  
  
  render() {                
    return (
      <div className="Admin">
        <h2>Admin</h2>
        <form>
          Firstname: <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} /> <br/>
          Email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>

          <select name="roles">
            <option value="admin">Admin</option>
            <option value="EIR">EIR</option>
            <option value="Staff">Staff</option>
            <option value="Founder">Founder</option>
            <option value="Outer">Outer</option>
          </select>
          <br/>
          <button onClick={(e) => this.handleClick(e)}>Send request</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default Admin;
