import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './SingleTool.css';


class SingleTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tools: [],
      message: null,
      n: ""
    }
  }


  handleClick(e) {
    e.preventDefault()
    let id = this.props.match.params.id

    api.deleteTools(id)
      .then(tools => {
        this.setState({
          n: tools.name,
          message: `Your tool '${this.state.n}' has been deleted`
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
    api.getSingleTool(id)
      .then(tools => {
        this.setState({
          tools: tools
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {                
    return (
      <div className="SingleTool">
        <h2>SingleTool</h2>
        <h3>Main infos</h3><br/>
        <p> {this.state.tools.name} </p>
        <p> {this.state.tools.pictureUrl} </p>
        <p> {this.state.tools.category} </p>
        <p> {this.state.tools.description} </p>

        <Link to={'/tools/' + this.state.tools._id + '/edit'}>Edit</Link> <br/>
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

export default SingleTool;
