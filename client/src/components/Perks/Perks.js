import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AddPerks from './AddPerks';
import api from '../../api';

class Perks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      perks: []
    }
  }

  componentDidMount() {
    api.getPerks()
      .then(perks => {
        this.setState({
          perks: perks
        })
      })
      .catch(err => console.log(err))
  }


  render() {                
    return (
      <div className="Perks">
        <h2>Perks</h2>
        <p>This is a list of all the perks you can access</p>
        {this.state.perks.map((c, i) => <li key={i}>  <Link to={'/perks/'+ c._id}>{c.name}</Link> </li>)} <br/>
        <Link to="/perks/add"><button name="add-perks" type="submit">Add perks</button></Link>        
      </div>
    );
  }
}

export default Perks;
