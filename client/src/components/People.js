import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AddPeople from './AddPeople';
import api from '../api';

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
  }

  componentDidMount() {
    api.getPeople()
      .then(people => {
        console.log(people)
        this.setState({
          people: people
        })
      })
      .catch(err => console.log(err))
  }


  render() {                
    return (
      <div className="People">
        <h2>People</h2>
        <Link to="/people/add"><button name="add-people" type="submit">Add people</button></Link>
        <p>This is a list of all the people linked with Orion</p>
        {this.state.people.map((c, i) => <li key={i}>{c.firstname} {c.lastname}</li>)}
      </div>
    );
  }
}

export default People;
