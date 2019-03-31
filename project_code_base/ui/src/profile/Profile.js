import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import userimg from '../logo.svg';

const btnStyle = {
  'font-size':'18px',
  'width': '422px',
  'height':'48px',
  'marginLeft': '30%',
  'marginTop': '60px',
  'background-color':'#4792d1'
};
class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      stackId:null,
      dataKey:null,
      contractError:false,
      profileAdded: false
    };
  }

  componentDidMount(){
    //const {drizzle,drizzleState} = this.props;
    const authenticated = this.props.authProps.isAuthenticated;
    if(authenticated){
      const dataKey = this.props.authProps.accountRetrievedKey;
      this.setState({dataKey});
    }
   

    // save the `dataKey` to local component state for later reference
    //this.setState({dataKey});

  };
  
  render() {
    if(this.state.dataKey === null){
      return (
        <p className="errorMessage"><span>Please login <Link to="/login">here!</Link></span></p>
      );
    }
    // get the contract state from drizzleState
      const driz = this.props.drizzle;
     const { RegisterPatient } = this.props.drizzleState.contracts;
      

      // using the saved `dataKey`, get the variable we're interested in
      const patient = RegisterPatient.getPatient[this.state.dataKey]; //
      let patientJSON = null;
      let patientApp = null;
      if(patient && patient.value){
        patientJSON = patient.value[0];
        patientApp = patient.value[1];
       // patientApp = driz.web3.utils.toAscii(patientApp);
      }
      let patientObj = null;
      if(patientJSON){
        patientObj = JSON.parse(patientJSON);
        if(!this.state.profileAdded){
          this.setState({profileAdded:true});
          this.props.authProps.handleAccount(patientObj);
        }
      }

      //const key = this.state.dataKey;
      //const patient = patientAcct[key]; // retrieve particular one using the key
     // console.log(patient);
      //const patientObj = patient.value[0];
     // console.log(patientObj);
    
    if(!patient || !patient.value){
        return (
          <div className="container">
            <div className="jumbotron">
              <p>Please login first <Link to="/login">here!</Link></p>
            </div>
          </div>
        );
      }
    return (
      
      <div className="profile-container">
        <div className="col-sm-12">
         <div className="panel panel-primary" >
          <div className="panel-heading">MY PROFILE</div>
          <div className="panel-body">
          <form method="POST" name="SignupForm" onSubmit={this.handleSubmit}>
           
              
           
           <div className="row"><div className="form-group col-sm-10">
              <img src={userimg} alt="profile-img" className="profile-img" />
              </div>
             <div className="form-group col-sm-6">
             <label htmlFor="fistName">First Name:</label>
             <input type="text" className="form-control" placeholder="First Name" value={patientObj.firstName} onChange={this.handleInputChange}
          name="firstName" required/>
             </div>
           
             <div className="form-group col-sm-6">
             <label htmlFor="lastName">Last Name:</label>
             <input type="text" className="form-control" placeholder="Last Name" value={patientObj.lastName} name="lastName" required/>
            </div>
            <div className="form-group col-sm-6">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" placeholder="johndoe@gmail.com" value={patientObj.email}
            onChange={this.handleInputChange} name="email" required/>
            </div>
           <div className="form-group col-sm-6">
           <label htmlFor="phone">Phone Number:</label>
           <input type="text" className="form-control" placeholder="xxx-xxx-xxxx" value={patientObj.phone}
            onChange={this.handleInputChange} name="phone" required/>
          </div>
          <div className="form-group col-sm-6">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" className="form-control" placeholder="mm/dd/yyyy" value={patientObj.dob} onChange={this.handleInputChange} name="dob" required/>
          </div>
          <div className="form-group col-sm-6">
          <label htmlFor="ssn">Social Security Number:</label>
          <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.ssn} onChange={this.handleInputChange} name="ssn" required/>
          </div>
          <div className="form-group col-sm-6">
          <label htmlFor="ssn">Insurance Provider:</label>
          <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.insuranceProvider} onChange={this.handleInputChange} name="ssn" required/>
          </div>
          <div className="form-group col-sm-6">
          <label htmlFor="ssn">Insurance Group Number:</label>
          <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.insuranceGroupNumber} onChange={this.handleInputChange} name="ssn" required/>
          </div>
          </div>
          <button type="submit" className="btn btn-primary" style={btnStyle}>SAVE</button>
          </form>
        </div>
        </div>
      </div>

        <h2>Profile</h2>
        <div className="table-responsive">
          <div className="container">
            <h2>Your upcoming appointments</h2>
            <ul className="list-group">
                {patientApp.map(function(name, index){
                    return <li className="list-group-item list-group-item-info" key={index}>{driz.web3.utils.toAscii(name)}</li>;
                  })}
            
            </ul>
        </div>
        </div>

      </div>
    );
  }
}

export default Profile;
