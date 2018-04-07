import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import './SingleUser.css';
import $ from 'jquery';
import PopperJS from 'popper.js';

import mailLogo from './../../img/logo-mail.png';
import phoneLogo from './../../img/logo-phone.png';

class SingleUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: {},
      message: null,
      f: "",
      l: ""
    }
  }

  getHexadecimalColor(people) {
    let colors = ["#f7dba7", "#f1ab86", "#c57b57", "#1e2d2f", "#041f1e"];

    let index = (people.firstname + people.lastname + people.email).length % colors.length;
    return colors[index];
  }


  handleClick(e) {
    e.preventDefault()
    let id = this.props.match.params.id

    api.deletePeople(id)
      .then(people => {
        this.setState({
          f: people.firstname,
          l: people.lastname,
          message: `Your people '${this.state.f} ${this.state.l}' has been deleted`
        })

        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000)
      })
    }


  componentDidMount(props) {

    let id = this.props.match.params.id
    api.getSingleUser(id)
      .then(people => {
        this.setState({
          people: people
        })
      })
      .catch(err => console.log(err))
  }

  getInitials(people) {    
    if (this.state.people.firstname) {
      let fi = people.firstname.charAt(0);
      let li = people.lastname.charAt(0);

      return fi + li
    }
    else return "Loading..."
  }
  
  render() {                
    return (
      <div className="SingleUser" container>
        <div className="profile-picture">
          {this.state.people.pictureUrl && <img className="picture-url picture-url-round" src={this.state.people.pictureUrl} alt=""/>}
          {!this.state.people.pictureUrl && <div className="default-picture" style={{backgroundColor: this.getHexadecimalColor(this.state.people)}}>{this.getInitials(this.state.people)} </div>}

        </div>

        <div className="profile-content">
        <h2>{this.state.people.firstname} {this.state.people.lastname}</h2>
          <div className="contact-logos">
            <a href={"mailto:" + this.state.people.email}><img src={mailLogo} className="logo-mail" alt="logo-mail" /></a>
            <img src={phoneLogo} className="logo-phone" alt="logo-phone" title={this.state.people.mobilePhone} />
          </div>
          {/* <p> Phone : {this.state.people.mobilePhone} </p> */}
          <h5>Who are you ?</h5>
          <p>I am {this.state.people.position} @{this.state.people._company && this.state.people._company.name}</p>
          <br/>
          <h5>Other fellows can ask me anything about:</h5>
          <p>{this.state.people.specialSkill}</p>
          {/* <p> Position : {this.state.people.position} </p>
          <p> Company : {this.state.people._company && this.state.people._company.name} </p> */}
          <br/>
          {api.isAdmin() && (
            <div className="edit-delete-buttons">
              <button className="btn btn-secondary edit-button"><Link to={'/people/' + this.state.people._id + '/edit'}>Edit</Link></button> <br/>
              <button type="submit" className="btn btn-danger" onClick={(e) => this.handleClick(e)}>Delete</button>
            </div>
          )}
        </div>

        <div style={{
          margin: 10,
          backgroundColor: "green",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default SingleUser;
