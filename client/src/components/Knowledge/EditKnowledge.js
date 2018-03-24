import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './EditKnowledge.css';


class EditKnowledge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "",
      title: "",
      pictureUrl: "",
      description: "",
      link: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }


  componentDidMount(props) {
    let id = this.props.match.params.id
    
    api.getSingleKnowledge(id)
      .then(knowledge => {
        this.setState({
          category: knowledge.category,
          title: knowledge.title,
          pictureUrl: knowledge.pictureUrl,
          description: knowledge.description,
          link: knowledge.link    
        })
      })
      .catch(err => {
      }) 
  }


  handleClick(e) {
    e.preventDefault()
    let data = {
      category: this.state.category,      
      title: this.state.title,
      pictureUrl: this.state.pictureUrl,
      description: this.state.description,
      link: this.state.link      
    }

    let id = this.props.match.params.id;
  
    api.editKnowledge(id, data)
      .then(result => {
        this.setState({
          category: "",
          title: "",
          pictureUrl: "",
          description: "",
          link: "",
          message: `Your knowledge '${this.state.title}' has been modified`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000)
      })
      .catch(err => {
      })
  }
  
  
  render() {                
    return (
      <div className="EditKnowledge">
        <h2>Edit knowledge</h2>
        <p>Edit</p>
        <form>
          category: <input type="text" value={this.state.category} onChange={(e) => {this.handleInputChange("category", e)}} /> <br/>
          title: <input type="text" value={this.state.title} onChange={(e) => {this.handleInputChange("title", e)}} /> <br/>
          pictureUrl: <input type="text" value={this.state.pictureUrl} onChange={(e) => {this.handleInputChange("pictureUrl", e)}} /> <br/>
          description: <input type="text" value={this.state.description} onChange={(e) => {this.handleInputChange("description", e)}} /> <br/>
          link: <input type="text" value={this.state.link} onChange={(e) => {this.handleInputChange("link", e)}} /> <br/>          
          <button onClick={(e) => this.handleClick(e)}>Modify knowledge</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "blue",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default EditKnowledge;
