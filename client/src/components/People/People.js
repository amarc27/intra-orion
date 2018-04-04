import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AddPeople from './AddPeople';
import api from '../../api';
import './People.css';

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      searchInput: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }


  getHexadecimalColor(people) {
    let colors = ["#222", "#425cbb", "chartreuse"];

    let index = (people.firstname.length + people.lastname.length + people.email.length) % colors.length;
    return colors[index];
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

  componentDidMount() {
    api.getPeople()
      .then(people => {
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
        <p>This is a list of all the people linked with Orion</p>
        <p>Search for people : <input type="text" value={this.state.searchInput} onChange={(e) => {this.handleInputChange("searchInput", e)}} /></p>

        <div className="people-cards">
          {this.getFilteredPeople().map((c, i) => <div key={i}>  
            <Link to={'/people/'+ c._id}>
              <div className="card" style={{width: "18rem"}}>
                {c.pictureUrl && <img className="card-img-top" src={c.pictureUrl} alt="Card image cap"/>}
                {!c.pictureUrl && <div className="default-picture" style={{backgroundColor: this.getHexadecimalColor(c)}} >{c.firstname.substr(0, 1).toUpperCase()}{c.lastname.substr(0, 1).toUpperCase()}</div>}
                <div className="card-body">
                  <p className="card-text">{c.firstname} {c.lastname}</p>
                </div>
              </div>
            </Link> 
          </div>)} 
        </div>
        <br/>
        <Link to="/people/add"><button className="add-people" type="submit">Add people</button></Link>        
      </div>
    );
  }
}

export default People;
