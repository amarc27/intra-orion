import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
// import './Admin.css';
// import { Container, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';


class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      email: "",
      role: "",
      message: null
    }
    console.log('okokokokok')
  }

  handleInputChange(stateFieldName, event) {
    console.log('input')
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    var ev = document.getElementById("roleDropdown");
    console.log('click', ev.options[ev.selectedIndex].value)
    var strUser = ev.options[ev.selectedIndex].value;
    this.setState({ role: strUser });

    let data = {
      firstname: this.state.firstname,
      email: this.state.email,
      role: strUser
    }
    
    api.postSendMail(data)
      .then(result => {
        this.setState({
          firstname: "",
          email: "",
          role: "",
          message: `Your people '${this.state.firstname} (${this.state.email}, ${this.state.role})' has been invited`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1500)
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

          <select name="role" id="roleDropdown">
            <option value="Admin">Admin</option>
            <option value="EIR">EIR</option>
            <option value="Staff">Staff</option>
            <option value="Founder">Founder</option>
            <option value="Outer">Outer</option>
          </select>

          <br/><br/>
          <button onClick={(e) => this.handleClick(e)}>Send request</button>
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

export default Admin;
