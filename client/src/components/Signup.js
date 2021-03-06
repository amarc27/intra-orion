import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
import './Signup.css';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobilePhone: "",
      specialSkill: "",
      position: "",
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
      email: querystring.parse(this.props.location.search).email,
      signupSecret: querystring.parse(this.props.location.search).signupSecret
    })
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.password !== this.state.password2) {
      this.setState({message: "The passwords don't match"})
      return;
    }
    let data = {
      email: this.state.email,
      signupSecret: this.state.signupSecret,
      mobilePhone: this.state.mobilePhone,
      specialSkill: this.state.specialSkill,
      position: this.state.position,
      password: this.state.password,
    }

    // let id = this.props.match.params.id;

    api.postSignup(data)
    .then(result => {
      this.setState({
        mobilePhone: "",
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
      <div className="Signup mt-5 mx-auto container">
        <h2>Signup</h2>
        <form>
          mobilePhone: <input className="form-control" type="text" value={this.state.mobilePhone} onChange={(e) => {this.handleInputChange("mobilePhone", e)}} /> <br/>
          specialSkill: <input className="form-control" type="text" value={this.state.specialSkill} onChange={(e) => {this.handleInputChange("specialSkill", e)}} /> <br/>
          position: <input className="form-control" type="text" value={this.state.position} onChange={(e) => {this.handleInputChange("position", e)}} /> <br/>
          password: <input className="form-control" type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} /> <br/>
          Confirm password: <input className="form-control" type="password" value={this.state.password2} onChange={(e) => {this.handleInputChange("password2", e)}} /> <br/>
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
