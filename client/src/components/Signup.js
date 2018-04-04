import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
// import './Signup.css';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      mobilePhone: "",
      role: "",
      specialSkill: "",
      position: "",
      company: "",
      email: "",
      signupSecret: "",
      message: null,
      password: "",
      password2: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }


  componentDidMount(props) {
    this.setState({
      email: queryString.parse(this.props.location.search).email,
      signupSecret: queryString.parse(this.props.location.search).signupSecret
    })
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.password !== this.state.password2) {
      this.setState({message: "The passwords don't match"})
      return;
    }
    console.log('email', this.state.email)
    let data = {
      email: this.state.email,
      signupSecret: this.state.signupSecret,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      mobilePhone: this.state.mobilePhone,
      role: this.state.role,
      specialSkill: this.state.specialSkill,
      position: this.state.position,
      company: this.state.company,
      password: this.state.password,
    }

    // let id = this.props.match.params.id;

    api.postSignup(data)
    .then(result => {
      this.setState({
        firstname: "",
        lastname: "",
        mobilePhone: "",
        role: "",
        pictureUrl: "",
        position: "",
        email: "",
        // message: `Your people '${this.state.firstname} ${this.state.lastname}' has been modified`
      })
      if (result.success)
        this.props.history.push("/login")
      else
        this.setMessage("Signup failed")
      // setTimeout(() => {
      //   this.setState({
      //     message: null
      //   })
      // }, 1000)
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
      <div className="Signup">
        <h2>Signup</h2>
        <form>
          signupSecret: {this.state.signupSecret} <br/>
          email: {this.state.email} <br/>
          firstname: <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} /> <br/>
          lastname: <input type="text" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} /> <br/>
          mobilePhone: <input type="text" value={this.state.mobilePhone} onChange={(e) => {this.handleInputChange("mobilePhone", e)}} /> <br/>
          specialSkill: <input type="text" value={this.state.specialSkill} onChange={(e) => {this.handleInputChange("specialSkill", e)}} /> <br/>
          company: <input type="text" value={this.state.company} onChange={(e) => {this.handleInputChange("company", e)}} /> <br/>
          position: <input type="text" value={this.state.position} onChange={(e) => {this.handleInputChange("position", e)}} /> <br/>
          password: <input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} /> <br/>
          Confirm password: <input type="password" value={this.state.password2} onChange={(e) => {this.handleInputChange("password2", e)}} /> <br/>
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

export default Signup;
