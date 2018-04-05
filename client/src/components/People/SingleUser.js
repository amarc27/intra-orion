import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import './SingleUser.css';


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
  
  render() {                
    return (
      <div className="SingleUser" container>
        <div className="profile-picture">
          <img className="picture-url picture-url-round" src={this.state.people.pictureUrl} alt=""/>
        </div>

        <div className="profile-content">
          <h2>{this.state.people.firstname} {this.state.people.lastname}</h2>
          <p> <a href={"mailto:" + this.state.people.email}>Email me</a></p>
          <p> Phone : {this.state.people.mobilePhone} </p>
          <p> SpecialSkill : {this.state.people.specialSkill} </p>
          <p> Position : {this.state.people.position} </p>
          <p> Company : {this.state.people._company && this.state.people._company.name} </p>

          {api.isAdmin() && (
            <div>
              <Link to={'/people/' + this.state.people._id + '/edit'}>Edit</Link> <br/>
              <button type="submit" onClick={(e) => this.handleClick(e)}>Delete</button>
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
