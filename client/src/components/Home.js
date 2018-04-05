import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';

// People
import People from './People/People';

// Office hour
import OfficeHours from './OfficeHours/OfficeHours.js';

// Knowledge
import Knowledge from './Knowledge/Knowledge';

// Tools
import Tools from './Tools/Tools';

// Perks
import Perks from './Perks/Perks';

// Others
import api from '../api';
import './Home.css';


class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <div className="Home">
        <h2 className="Home-title">Welcome to Orion</h2>

        <div className="Home-main-links">
          <ul className="col-sm-4" className="Home-ul">
            <li className="Home-li"><Link activeClassName="selected" to="/people">People</Link></li>
            <li className="Home-li"><Link activeClassName="selected" to="/office-hours">Office Hours</Link></li>
            <li className="Home-li"><Link activeClassName="selected" to="/knowledge">Knowledge</Link></li>
          </ul>
          <ul className="col-sm-4" className="Home-ul">
            <li className="Home-li"><Link activeClassName="selected" to="/tools">Tools</Link></li>
            <li className="Home-li"><Link activeClassName="selected" to="/perks">Perks</Link></li>
            <li className="Home-li"><Link activeClassName="selected" to="/candidates">Candidates</Link></li>
          </ul>
        </div> 
        
        {/* <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div> */}

      </div>
    );
  }
}

export default Home;
