import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './People/AddPeople.css';


class AddPeople extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      mobilePhone: "",
      role: "",
      pictureUrl: "",
      position: "",
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
      lastname: this.state.lastname,
      mobilePhone: this.state.mobilePhone,
      role: this.state.role,
      pictureUrl: this.state.pictureUrl,
      position: this.state.position,
      email: this.state.email,
    }

    api.postPeople(data)
      .then(result => {
        this.setState({
          firstname: "",
          lastname: "",
          mobilePhone: "",
          role: "",
          pictureUrl: "",
          position: "",
          email: "",
          message: `Your people '${this.state.firstname} ${this.state.lastname}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => {
      })
  }
  
  
  render() {                
    return (
      <div className="AddPeople">
        <h2>Add people</h2>
        <form>
          firstname: <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} /> <br/>
          lastname: <input type="text" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} /> <br/>
          mobilePhone: <input type="text" value={this.state.mobilePhone} onChange={(e) => {this.handleInputChange("mobilePhone", e)}} /> <br/>
          role: <input type="text" value={this.state.role} onChange={(e) => {this.handleInputChange("role", e)}} /> <br/>
          pictureUrl: <input type="text" value={this.state.pictureUrl} onChange={(e) => {this.handleInputChange("pictureUrl", e)}} /> <br/>
          position: <input type="text" value={this.state.position} onChange={(e) => {this.handleInputChange("position", e)}} /> <br/>
          email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
          <button onClick={(e) => this.handleClick(e)}>Create people</button>
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

export default AddPeople;
