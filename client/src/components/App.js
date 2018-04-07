import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';

import Home from './Home';

// People
import People from './People/People';
import AddPeople from './People/AddPeople';
import EditPeople from './People/EditPeople';
import SingleUser from './People/SingleUser';

// Perks
import Perks from './Perks/Perks';
import AddPerks from './Perks/AddPerks';
import EditPerks from './Perks/EditPerks';
import SinglePerk from './Perks/SinglePerk';


// Tools
import Tools from './Tools/Tools';
import AddTools from './Tools/AddTools';
import EditTools from './Tools/EditTools';
import SingleTool from './Tools/SingleTool';


// Knowledge
import Knowledge from './Knowledge/Knowledge';
import AddKnowledge from './Knowledge/AddKnowledge';
import EditKnowledge from './Knowledge/EditKnowledge';
import SingleKnowledge from './Knowledge/SingleKnowledge';


// Office hour
import OfficeHours from './OfficeHours/OfficeHours.js';


// Admin
import Admin from './Admin.js';

// Signup
import Signup from './Signup';

// Login
import Login from './Login';

// Others
import api from '../api';
import logo from '../orion-bleu.png';
import './App.css';







class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }


  render() {                
    return (
    <div className="App">
        <header className="App-header">
          {/* <Link activeClassName="selected" to="/"> */}
            <div className="App-dropdown dropdown">
              <img src={logo} className="App-logo dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" alt="logo" />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item"  to="/people">People</Link>
                <Link className="dropdown-item" to="/office-hours">Office Hours</Link>
                <Link className="dropdown-item" to="/knowledge">Knowledge</Link>
                <Link className="dropdown-item" to="/tools">Tools</Link>
                <Link className="dropdown-item" to="/perks">Perks</Link>
                <Link className="dropdown-item" to="/candidates">Candidates</Link>
              </div>
            </div>
          {/* </Link> */}
          <div className="nav-links-main">
            <NavLink activeClassName="selected" to="/">Home</NavLink>
            {api.isAdmin() && <NavLink activeClassName="selected" to="/admin">Admin</NavLink>}

            {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink> }
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink> }
            {api.isLoggedIn() && <NavLink to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink> }
          </div>
          <div className="nav-links-user">
            {<NavLink activeClassName="selected" to="/agenda">Agenda</NavLink>}
            <NavLink activeClassName="selected" to="/profile">Profile</NavLink>
          </div>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />

          {/* People */}
          <Route path="/people" exact component={People} />
          <Route path="/people/add" exact component={AddPeople}/>
          <Route path="/people/:id/edit" exact component={EditPeople}/>
          <Route path="/people/:id" exact component={SingleUser}/>

          {/* Perks */}
          <Route path="/perks" exact component={Perks} />
          <Route path="/perks/add" exact component={AddPerks}/>
          <Route path="/perks/:id/edit" exact component={EditPerks}/>
          <Route path="/perks/:id" exact component={SinglePerk}/>        

          {/* Tools */}
          <Route path="/tools" exact component={Tools} />
          <Route path="/tools/add" exact component={AddTools}/>
          <Route path="/tools/:id/edit" exact component={EditTools}/>
          <Route path="/tools/:id" exact component={SingleTool}/>

          {/* Knowledge */}
          <Route path="/knowledge" exact component={Knowledge} />
          <Route path="/knowledge/add" exact component={AddKnowledge}/>
          <Route path="/knowledge/:id/edit" exact component={EditKnowledge}/>
          <Route path="/knowledge/:id" exact component={SingleKnowledge}/>

          {/* OfficeHours */}
          <Route path="/office-hours" exact component={OfficeHours} />

          {/* Admin */}
          <Route path="/admin" exact component={Admin} />

          {/* Signup */}
          <Route path="/signup" exact component={Signup} />
           
           {/* Login */}
           <Route path="/login" exact component={Login} />
          
          {/* No route found */}
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
