import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './SinglePerk.css';


class SinglePerk extends Component {
  constructor(props) {
    super(props)
    this.state = {
      perks: [],
      message: null,
      n: ""
    }
  }


  handleClick(e) {
    e.preventDefault()
    let id = this.props.match.params.id

    api.deletePerks(id)
      .then(perks => {
        this.setState({
          n: perks.name,
          message: `Your perk '${this.state.n}' has been deleted`
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
    api.getSinglePerk(id)
      .then(perks => {
        this.setState({
          perks: perks
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {                
    return (
      <div className="SinglePerk">
        <h2>SinglePerk</h2>
        <h3>Main infos</h3><br/>
        <p> {this.state.perks.name} </p>
        <p> {this.state.perks.pictureUrl} </p>
        <p> {this.state.perks.category} </p>
        <p> {this.state.perks.description} </p>

        <Link to={'/perks/' + this.state.perks._id + '/edit'}>Edit</Link> <br/>
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

export default SinglePerk;
