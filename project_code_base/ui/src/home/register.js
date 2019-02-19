import React, { Component } from 'react';
import logo from '../logo.svg';

import ReviewAppointment from './review';


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
       requestApp: false,
       reviewAppointments: false,
       stackId:null,
       contractError:false,
       user: {
         firstName:'Jane',
         lastName: 'Doe',
         email: 'janedoe@gmail.com',
         phone:'412-123-4567',
         dob: '',
         ssn: '123-45-6789',
         pass:'',
         insuranceProvider: 'hmbcbs',
         insuranceGroupNumber: 'sdlc'
       }
      };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onReview = this.onReview.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let fields = this.state.user;
    fields[name] = value;
    this.setState({fields});
  }
  onReview(event) {
    event.preventDefault();
		this.setState({reviewAppointments:true})
  }
      
  handleSubmit(event) {
   event.preventDefault();
   const { drizzle, drizzleState } = this.props;

   // let drizzle know we want to call the `setPatient` method with `value`
   const contract = drizzle.contracts.RegisterPatient;

   if(!contract){
       this.setState({contractError:true});
       return;
   }
   const userObj = {
     firstName: this.state.user.firstName,
     lastName: this.state.user.lastName,
     email: this.state.user.email,
     phone: this.state.user.phone,
     dob: this.state.user.dob,
     ssn: this.state.user.ssn,
     pass: this.state.user.pass,
     insuranceProvider: this.state.user.insuranceProvider,
     insuranceGroupNumber: this.state.user.insuranceGroupNumber
   };
        let month = this.props.appointment.getMonth() + 1;
        let date = this.props.appointment.getDate();
        let year = this.props.appointment.getFullYear();
        let stringDate = month + "/" + date + "/" + year;
        //this.setState({user:{appointmentDate:stringDate}});
        let time = "9:00 am";
   const appObj = {
      date: stringDate,
      time: time
   };

  let appStringDate = JSON.stringify(appObj);
 // console.log(JSON.stringify(userObj));
  //console.log(appStringDate);
  console.log(drizzle.web3.utils.fromAscii(stringDate));
   const stackId = contract.methods["setPatient"].cacheSend(
         JSON.stringify(userObj),
         drizzle.web3.utils.fromAscii(stringDate),
        {
         from: drizzleState.accounts[0], gas: 500000});
       // save the `stackId` for later reference
       this.setState({ stackId });

 }

 // get transaction status
 getTxStatus = () => {
   // get the transaction states from the drizzle state
   const { transactions, transactionStack } = this.props.drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[this.state.stackId];

   // if transaction hash does not exist, don't display anything
   if (!txHash) return null;

   // otherwise, return the transaction status
   return transactions[txHash].status;
 };
	
  render() {
    if(this.getTxStatus() === "success"){
      this.props.history.push('/profile');
    }
    const {doctor} = this.props;
    //console.log(doctor);
    return (
      this.state.reviewAppointments === false ?
      <div className="row register-user">
      <div className="col-sm-8">
        <div className="panel panel-primary" style={leftPanelStyle}>
        <div className="panel-heading">Create Profile</div>
      <div className="panel-body">
      <p className="errorMessage">{this.state.contractError == true ? <span>Internal Error, Please try again later!</span>:null}</p>
      <p  className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
  <form method="POST" name="SignupForm" onSubmit={this.handleSubmit}>
   <div className="row">
    <div className="form-group col-sm-6">
      <label htmlFor="fistName">First Name:</label>
      <input type="text" className="form-control" placeholder="First Name"
        value={this.state.user.firstName}
        onChange={this.handleInputChange}
        name="firstName" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" className="form-control" placeholder="Last Name"
        value={this.state.user.lastName}
        onChange={this.handleInputChange}
        name="lastName" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control" placeholder="johndoe@gmail.com"
        value={this.state.user.email}
        onChange={this.handleInputChange}
        name="email" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="phone">Phone Number:</label>
      <input type="text" className="form-control" placeholder="xxx-xxx-xxxx"
        value={this.state.user.phone}
        onChange={this.handleInputChange}
        name="phone" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" className="form-control" placeholder="mm/dd/yyyy"
        value={this.state.user.dob}
        onChange={this.handleInputChange}
        name="dob" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="ssn">Social Security Number:</label>
      <input type="text" className="form-control" placeholder="xxx-xx-xxxx"
        value={this.state.user.ssn}
        onChange={this.handleInputChange}
        name="ssn" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="pass">Password:</label>
      <input type="password" className="form-control" placeholder="********"
        value={this.state.user.pass}
        onChange={this.handleInputChange}
        name="pass" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="rpass">Repeat Password:</label>
      <input type="password" className="form-control" placeholder="********" name="rpass" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="insurance">Insurance Provider:</label>
      <input type="text" className="form-control" placeholder="Provider"
        value={this.state.user.insuranceProvider}
        onChange={this.handleInputChange}
        name="insuranceProvider" required/>
    </div>
    <div className="form-group col-sm-6">
      <label htmlFor="insgrp">Insurance Group Number:</label>
      <input type="text" className="form-control" placeholder="********"
        value={this.state.user.insuranceGroupNumber}
        onChange={this.handleInputChange}
        name="insuranceGroupNumber" required/>
    </div>


    <button type="submit" className="btn btn-primary" style={btnStyle}>Create Profile</button>
    <button type="button" className="btn btn-default" style={lgnbtnStyle} onClick={this.onReview}>Login</button>
  </div>
 </form>
 </div>
</div>
      </div>
      <div className="col-sm-4">
      <div className="panel panel-primary" style={panelStyle}>
          <div className="panel-heading"> Your Appointment</div>
          <div className="panel-body">
            <img src={logo} className="img-thumbnail" alt="docotor-img" style={imgStyle}></img>
            <p>You have an appointment with <b> Dr.{doctor.name}</b></p>
            <p><span className="glyphicon glyphicon-calendar"></span> 2/2/2019</p>
            <p><span className="glyphicon glyphicon-time"></span> 9 am</p>
            <p><span className="glyphicon glyphicon-map-marker"></span> {doctor.address1}</p>
            <p>{doctor.address2}</p>
            <p><span className="glyphicon glyphicon-earphone"></span> {doctor.phone} </p>
          </div>
      </div>
      </div>
      </div>
      :<ReviewAppointment doctor={this.props.doctor} appointment={this.props.appointment}/>
      
    );
  }
}

export default CreateProfile;
