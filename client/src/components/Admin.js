import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from './../api';
// import './Admin.css';
// import { Container, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';


class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "chacha",
      email: "",
      role: "Founder",

      companies: [],
      companyName: "",
      companyPictureUrl: "",
      companyDescription: "",
      companyWebsite: "",
      companyRole: "",
      companySector: "",
      message: null
    }
  }


  componentDidMount() {
    api.getCompanies()
    .then(result => {
      this.setState({
        companies: result
      })
    })
  }


  handleInputChange(stateFieldName, event) {
    console.log('input')
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handlePeopleAddClick(e) {
    e.preventDefault()

    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      role: this.state.role,
    }
    
    api.postSendMail(data)
      .then(result => {
        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          role: "",
          message: `Your people '${this.state.firstname} ${this.state.lastname} (${this.state.email}, ${this.state.role})' has been invited`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1500)
      })
      .catch(err => {
      })
  }




  // Add company
  handleCompanyAddClick(e) {
    e.preventDefault()
    
    let data = {
      name: this.state.companyName,
      pictureUrl: this.state.companyPictureUrl,
      description: this.state.companyDescription,
      website: this.state.companyWebsite,
      role: this.state.companyRole,
      sector: this.state.companySector,
    }
    
    api.postCompany(data)
      .then(result => {
        this.setState({
          companyName: "",
          companyPictureUrl: "",
          companyDescription: "",
          companyWebsite: "",
          companyRole: "",
          companySector: "",
          message: `Machin '${this.state.companyName}' has been invited`
        })

    this.componentDidMount()

        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1500)
      })
      .catch(err => {
      })
  }
  
  
  render() {                
    return (
      <div className="Admin">
        <h2>Admin</h2>

        <h2>Add people</h2>
        <form>
          Firstname: <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} /> <br/>
          Lastname: <input type="text" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} /> <br/>
          Email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>

          <select onChange={(e) => {this.handleInputChange("role", e)}} value={this.state.role} name="role">
            <option value="Admin">Admin</option>
            <option value="EIR">EIR</option>
            <option value="Staff">Staff</option>
            <option value="Founder">Founder</option>
            <option value="Outer">Outer</option>
          </select>
          
          <select name="_company">
            {this.state.companies.map((c, i) =>  <option value={c._id}>{c.name}</option>)}
          </select>

          <br/><br/>
          <button onClick={(e) => this.handlePeopleAddClick(e)}>Send request</button>
        </form>
        <br/><br/>

        <h2>Add company</h2>
        companyName: <input type="text" value={this.state.companyName} onChange={(e) => {this.handleInputChange("companyName", e)}} /> <br/>
        companyPictureUrl: <input type="text" value={this.state.companyPictureUrl} onChange={(e) => {this.handleInputChange("companyPictureUrl", e)}} /> <br/>
        companyDescription: <input type="text" value={this.state.companyDescription} onChange={(e) => {this.handleInputChange("companyDescription", e)}} /> <br/>
        companyWebsite: <input type="text" value={this.state.companyWebsite} onChange={(e) => {this.handleInputChange("companyWebsite", e)}} /> <br/>
        companyRole: <input type="text" value={this.state.companyRole} onChange={(e) => {this.handleInputChange("companyRole", e)}} /> <br/>
        companySector: <input type="text" value={this.state.companySector} onChange={(e) => {this.handleInputChange("companySector", e)}} /> <br/>
        <button onClick={(e) => this.handleCompanyAddClick(e)}>Add company</button>

        <div style={{
          margin: 10,
          backgroundColor: "yellow",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default Admin;
