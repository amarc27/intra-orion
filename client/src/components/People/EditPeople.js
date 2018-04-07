import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
import './EditPeople.css';


class EditPeople extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      mobilePhone: "",
      role: "",
      pictureUrl: "",
      position: "",
      specialSkill: "",
      email: "",
      
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }


  componentDidMount(props) {
    let id = this.props.match.params.id
    
    api.getSingleUser(id)
      .then(people => {
        this.setState({
          firstname: people.firstname,
          lastname: people.lastname,
          mobilePhone: people.mobilePhone,
          role: people.role,
          pictureUrl: people.pictureUrl,
          position: people.position,
          email: people.email,
          specialSkill: people.specialSkill
        })
      })
      .catch(err => {
      }) 
  }


  handleClick(e) {
    e.preventDefault()
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      mobilePhone: this.state.mobilePhone,
      role: this.state.role,
      pictureUrl: this.state.pictureUrl,
      position: this.state.position,
      email: this.state.email,
      specialSkill: this.state.specialSkill
    }

    let id = this.props.match.params.id;
  
    api.editPeople(id, data)
      .then(result => {
        this.setState({
          firstname: "",
          lastname: "",
          mobilePhone: "",
          role: "",
          pictureUrl: "",
          position: "",
          email: "",
          specialSkill: "",
          message: `Your people '${this.state.firstname} ${this.state.lastname}' has been modified`
        })
        // setTimeout(() => {
        //   this.setState({
        //     message: null
        //   })
        // }, 1000)
        if (result.success)
          this.props.history.push("/people/"+ this.props.match.params.id)
        else
          this.setMessage("Edit failed")
      })
      .catch(err => {
      })
  }
  
  handleInputFileChange (e) {

    let id = this.props.match.params.id

    this.setState({
      pictureUrl: null
    })

    api.editPeoplePicture(id, e.target.files[0])
      .then(data => {
        console.log(data)
        this.setState({
          pictureUrl: data.pictureUrl
        })
      })
  }

  getHexadecimalColor() {
    let colors = ["#f7dba7", "#f1ab86", "#c57b57", "#1e2d2f", "#041f1e"];

    let index = (this.state.firstname + this.state.lastname + this.state.email).length % colors.length;
    return colors[index];
  }

  getInitials() {    
    if (this.state.firstname) {
      let fi = this.state.firstname.charAt(0);
      let li = this.state.lastname.charAt(0);

      return fi + li
    }
    else return "Loading..."
  }


  render() {                
    return (
      <div className="EditPeople">
        <h2>Edit people</h2>
        {/* <div class="custom-file">
          <input type="file" onChange={this.handleInputFileChange.bind(this)} class="custom-file-input" id="customFile"></input>
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div> */}
        {/* <input type="file" name="" id="" onChange={this.handleInputFileChange.bind(this)} /><br/> */}

        <form className="edit-form">
          <div className="profile-picture">
            {this.state.pictureUrl && <img className="picture-url" src={this.state.pictureUrl} alt=""/>}<br/>
            {!this.state.pictureUrl && <div className="default-picture" style={{backgroundColor: this.getHexadecimalColor()}}>{this.getInitials(this.state.people)} </div>}
          </div>
          <div class="custom-file">
            <input type="file" onChange={this.handleInputFileChange.bind(this)} class="custom-file-input" id="customFile"></input>
            <label className="custom-file-label" for="customFile">Choose file</label>
          </div>
          {/* <input type="file" name="" id="" onChange={this.handleInputFileChange.bind(this)} /><br/> */}
          <hr/>

          <div className="form-group">
            <label for="email">Email address</label>
            <input type="email" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} className="form-control" id="email" placeholder="Enter email"></input>
          </div>
          <div className="row">
            <div className="form-group col">
              <label for="firstname">Firstname</label>            
              <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} className="form-control" id="firstname" placeholder="Enter firstname"></input>
            </div>
            <div className="form-group col">
              <label for="lastname">Lastname</label>            
              <input type="text" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} className="form-control" id="lastname" placeholder="Enter lastname"></input>
            </div>
          </div>
          <div className="form-group">
            <label for="mobilePhone">Phone number</label>            
            <input type="tel" value={this.state.mobilePhone} onChange={(e) => {this.handleInputChange("mobilePhone", e)}} className="form-control" id="mobilePhone" placeholder="Enter phone number"></input>
          </div>
          <div className="form-group">
            <label for="role">Role</label>
            <select className="form-control" id="role" onChange={(e) => {this.handleInputChange("role", e)}} value={this.state.role} name="role">
              <option value="Admin">Admin</option>
              <option value="EIR">EIR</option>
              <option value="Staff">Staff</option>
              <option value="Founder" defaultValue>Founder</option>
              <option value="Outer">Outer</option>
            </select>
          </div>
          <div className="form-group">
            <label for="specialSkill">Main skill</label>            
            <input type="text" value={this.state.specialSkill} onChange={(e) => {this.handleInputChange("specialSkill", e)}} className="form-control" id="specialSkill" aria-describedby="specialSkillHelp" placeholder="Indicate your main skill, what you are good at"></input>
            <small id="specialSkillHelp" class="form-text text-muted">Tell us what skill you're good at, so that others can contact you if they need help on it.</small>
          </div>
          <div className="form-group">
            <label for="position">Position</label>            
            <input type="text" value={this.state.position} onChange={(e) => {this.handleInputChange("position", e)}} className="form-control" id="position" placeholder="Your official position in the company"></input>
          </div>
          <button onClick={(e) => this.handleClick(e)} class="btn btn-secondary">Modify this profile</button>
        </form>


        {/* <form>
          firstname: <input type="text" value={this.state.firstname} onChange={(e) => {this.handleInputChange("firstname", e)}} /> <br/>
          lastname: <input type="text" value={this.state.lastname} onChange={(e) => {this.handleInputChange("lastname", e)}} /> <br/>
          mobilePhone: <input type="text" value={this.state.mobilePhone} onChange={(e) => {this.handleInputChange("mobilePhone", e)}} /> <br/>
          role: <input type="text" value={this.state.role} onChange={(e) => {this.handleInputChange("role", e)}} /> <br/>
          specialSkill: <input type="text" value={this.state.specialSkill} onChange={(e) => {this.handleInputChange("specialSkill", e)}} /> <br/>
          position: <input type="text" value={this.state.position} onChange={(e) => {this.handleInputChange("position", e)}} /> <br/>
          email: <input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
          <button onClick={(e) => this.handleClick(e)}>Modify people</button>
        </form> */}
        <div style={{
          margin: 10,
          backgroundColor: "blue",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default EditPeople;
