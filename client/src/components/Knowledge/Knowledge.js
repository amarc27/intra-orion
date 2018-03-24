import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AddKnowledge from './AddKnowledge';
import api from '../../api';

class Knowledge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      knowledge: []
    }
  }

  componentDidMount() {
    api.getKnowledge()
      .then(knowledge => {
        this.setState({
          knowledge: knowledge
        })
      })
      .catch(err => console.log(err))
  }


  render() {                
    return (
      <div className="Knowledge">
        <h2>Knowledge</h2>
        <p>You will find here all the basic knowledge on startup development.</p>
        {this.state.knowledge.map((c, i) => <li key={i}>  <Link to={'/knowledge/'+ c._id}>{c.title}</Link> </li>)} <br/>
        <Link to="/knowledge/add"><button name="add-knowledge" type="submit">Add knowledge</button></Link>        
      </div>
    );
  }
}

export default Knowledge;
