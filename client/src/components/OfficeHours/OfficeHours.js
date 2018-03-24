import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import AddOfficeHours from './AddOfficeHours';
import api from '../../api';

class OfficeHours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
  }



  componentDidMount() {
    let role = this.state.people.role;
    api.getSpecificPeople()
      .then(people => {
        this.setState({
          people: people
        })
      })
      .catch(err => console.log(err))
  }


  render() {                
    return (
      <div className="OfficeHours">
        <h2>Office hours</h2>
        <p>This is a list of EIR</p>
        {this.state.people.map((c, i) => <li key={i}>  <Link to={'/people/'+ c._id}>{c.firstname} {c.lastname}</Link> </li>)} <br/>
        <Link to="/people/add"><button name="add-people" type="submit">Add people</button></Link>
      </div>
    );
  }
}

export default OfficeHours;
