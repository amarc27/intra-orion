import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';

import Home from './Home';
import People from './People';
import AddPeople from './AddPeople';

import api from '../api';
import logo from '../logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {                
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Orion</h1>
          <NavLink activeClassName="selected" to="/">Home</NavLink> 
          <NavLink activeClassName="selected" to="/people">People</NavLink> 
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/people" exact component={People} />
          <Route path="/people/add" component={AddPeople}/>
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
