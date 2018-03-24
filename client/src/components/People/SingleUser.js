import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './SingleUser.css';


class SingleUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
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
      <div className="SingleUser">
        <h2>SingleUser</h2>
        <h3>Main infos</h3><br/>
        <p> {this.state.people.firstname} {this.state.people.lastname} </p>
        <p> {this.state.people.email} </p>
        <p> {this.state.people.mobilePhone} </p>
        {/* <p> {this.state.people.role.enum} </p> */}

        <Link to={'/people/' + this.state.people._id + '/edit'}>Edit</Link> <br/>
        <button type="submit" onClick={(e) => this.handleClick(e)}>Delete</button>
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
