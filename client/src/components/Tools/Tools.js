import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import AddTools from './AddTools';
import api from '../../api';

class Tools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tools: []
    }
  }

  componentDidMount() {
    api.getTools()
      .then(tools => {
        this.setState({
          tools: tools
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="Tools">
        <h2>Tools</h2>
        <p>This is a list of all the tools you can use</p>
        {this.state.tools.map((c, i) => <li key={i}>  <Link to={'/tools/'+ c._id}>{c.name}</Link> </li>)} <br/>
        <Link to="/tools/add"><button name="add-tools" type="submit">Add tools</button></Link>        
      </div>
    );
  }
}

export default Tools;
