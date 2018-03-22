import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';

import Home from './Home';
import People from './People/People';
import AddPeople from './People/AddPeople';
import EditPeople from './People/EditPeople';
import SingleUser from './People/SingleUser';

import api from '../api';
import logo from '../orion-bleu.png';
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
          <Route path="/people/add" exact component={AddPeople}/>
          <Route path="/people/:id/edit" exact component={EditPeople}/>
          <Route path="/people/:id" exact component={SingleUser}/>
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
