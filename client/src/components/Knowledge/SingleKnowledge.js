import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './SingleKnowledge.css';


class SingleKnowledge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      knowledge: [],
      message: null,
      t: ""
    }
  }


  handleClick(e) {
    e.preventDefault()
    let id = this.props.match.params.id

    api.deleteKnowledge(id)
      .then(knowledge => {
        this.setState({
          t: knowledge.title,
          message: `Your knowledge '${this.state.t}' has been deleted`
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
    api.getSingleKnowledge(id)
      .then(knowledge => {
        this.setState({
          knowledge: knowledge
        })
      })
      .catch(err => console.log(err))
  }

  render() {                
    return (
      <div className="SingleKnowledge">
        <h2>SingleKnowledge</h2>
        <h3>Main infos</h3><br/>
        <p> {this.state.knowledge.category} </p>
        <p> {this.state.knowledge.title} </p>
        <p> {this.state.knowledge.pictureUrl} </p>
        <p> {this.state.knowledge.description} </p>
        <p> {this.state.knowledge.link} </p>

        <Link to={'/knowledge/' + this.state.knowledge._id + '/edit'}>Edit</Link> <br/>
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

export default SingleKnowledge;
