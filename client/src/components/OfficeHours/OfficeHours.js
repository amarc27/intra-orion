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


  getFilteredPeople() {
    let res = [];

    for (let i = 0; i < this.state.people.length; i++) {
      let fullname = this.state.people[i].firstname + " " + this.state.people[i].lastname
      if (fullname.toUpperCase().includes(this.state.searchInput.toUpperCase())) {
        res.push(this.state.people[i])
      }
    }
    return res
  }



  render() {                
    return (
      <div className="OfficeHours">
        <h2>Office hours</h2>
        <p>This is a list of EIR</p>
        {/* {this.state.people.map((c, i) => <li key={i}>  <Link to={'/people/'+ c._id}>{c.firstname} {c.lastname}</Link> </li>)} <br/>
        <Link to="/people/add"><button name="add-people" type="submit">Add people</button></Link> */}

        <div className="people-cards container">
          {this.state.people.map((c, i) => <div key={i}>  
            <Link to={'/people/'+ c._id}>
              <div className="card" style={{width: "10rem"}}>
                {c.pictureUrl && <img className="card-img-top" src={c.pictureUrl} alt="Card image cap"/>}
                {!c.pictureUrl && <div className="default-picture">{c.firstname.substr(0, 1).toUpperCase()}{c.lastname.substr(0, 1).toUpperCase()}</div>}
                <div className="card-body">
                  <p className="card-text">{c.firstname} {c.lastname} <br/>
                    {c._company.name}
                  </p>
                </div>
              </div>
            </Link> 
          </div>)} 
        </div>  
        
        <hr/>

        <div className="calendly-inline-widget" data-url="https://calendly.com/antoinefl-marc/30min" style={{minWidth:320,height:580}}></div>
      </div>
    );
  }
}

export default OfficeHours;
