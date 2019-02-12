import React, { Component } from 'react';
import logo from '../logo.svg';



const imgStyle = {
      'width': '120px',
      'height': '120px',
      'marginLeft': '30%'
};
const btnStyle = {
      'width': '120px',
      'marginLeft': '42%'
};
const lgnbtnStyle = {
      'width': '120px',
      'display': 'block',
      'marginLeft': '42%',
      'marginTop': '20px',
      'border': '2px solid #2b5c92'

};
const panelStyle = {
      'marginTop': '25px'
};
const leftPanelStyle = {
      'marginLeft': '30px',
      'marginTop': '25px'
};

class CreateProfile extends Component {
  constructor (props) {
  super(props);
    this.state = {
       requestApp: false
      };  
  }


  render() {
    const {doctor} = this.props;
    //console.log(doctor);
    return (
      <div className="row register-user">
      <div className="col-sm-8">
        <div className="panel panel-primary" style={leftPanelStyle}>
        <div className="panel-heading">Create Profile</div>
      <div className="panel-body">
  <form method="POST">
   <div className="row">     
    <div className="form-group col-sm-6">
      <label htmlFor="fistName">First Name:</label>
      <input type="text" className="form-control" placeholder="First Name" name="firstName" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" className="form-control" placeholder="Last Name" name="lastName" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control" placeholder="johndoe@gmail.com" name="email" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="phone">Phone Number:</label>
      <input type="text" className="form-control" placeholder="xxx-xxx-xxxx" name="phone" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" className="form-control" placeholder="mm/dd/yyyy" name="dob" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="ssn">Social Security Number:</label>
      <input type="text" className="form-control" placeholder="xxx-xx-xxxx" name="ssn" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" className="form-control" placeholder="mm/dd/yyyy" name="dob" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="ssn">Social Security Number:</label>
      <input type="text" className="form-control" placeholder="xxx-xx-xxxx" name="ssn" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="pass">Password:</label>
      <input type="password" className="form-control" placeholder="********" name="pass" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="rpass">Repeat Password:</label>
      <input type="password" className="form-control" placeholder="********" name="rpass" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="insurance">Insurance Provider:</label>
      <input type="text" className="form-control" placeholder="Provider" name="insurance" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="insgrp">Insurance Group Number:</label>
      <input type="text" className="form-control" placeholder="********" name="insgrp" required/>
    </div>

    
    <button type="submit" className="btn btn-primary" style={btnStyle}>Create Profile</button>
    <button type="button" className="btn btn-default" style={lgnbtnStyle}>Login</button>
  </div>
 </form>
 </div>
</div>
      </div>
      <div className="col-sm-4">
      <div className="panel panel-primary" style={panelStyle}>
          <div className="panel-heading"> Your Appointment</div>
          <div className="panel-body">
            <img src={logo} className="img-thumbnail" style={imgStyle}></img>
            <p>You have an appointment with <b> Dr.{doctor.name}</b></p>
            <p><span className="glyphicon glyphicon-calendar"></span> 2/2/2019</p>
            <p><span className="glyphicon glyphicon-time"></span> 9 am</p>
            <p><span className="glyphicon glyphicon-map-marker"></span> {doctor.address1}</p>
            <p>{doctor.address2}</p>
            <p><span className="glyphicon glyphicon-earphone"></span> {doctor.phone} </p>

            <p>Reason for Visit:</p>

          </div>
      </div>
      </div>
      </div>
       
    );
  }
}

export default CreateProfile;
