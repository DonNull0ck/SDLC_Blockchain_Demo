import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import userimg from '../logo.svg';



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

  };
  
  render() {
    if(this.state.dataKey === null){
      return (
       <Link to="/login">Please login here!</Link>
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
      }
      let patientObj = null;
      if(patientJSON){
        patientObj = JSON.parse(patientJSON);
        if(!this.state.profileAdded){
          this.setState({profileAdded:true});
          this.props.authProps.handleAccount(patientObj);
        }
      }
    
    if(!patient || !patient.value){
        return (
          <div className="container">
            <div className="jumbotron">
              <Link to="/login">Please login first here!</Link>
            </div>
          </div>
        );
      }
    return (
      <div className="col-sm-12">
      <div className="panel panel-primary" >
        <div className="panel-heading">MY PROFILE</div>
        <div className="panel-body">
            <div className="row"><div className="form-group col-sm-10">
              <img src={userimg} alt="profile-img" className="profile-img" />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="fistName">First Name:</label>
              <input type="text" className="form-control" placeholder="First Name" value={patientObj.firstName}
              name="firstName" readOnly/>
            </div>
            
            <div className="form-group col-sm-6">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" className="form-control" placeholder="Last Name" value={patientObj.lastName} name="lastName" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" placeholder={patientObj.email} value={patientObj.email}
              name="email" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="phone">Phone Number:</label>
              <input type="text" className="form-control" placeholder="xxx-xxx-xxxx" value={patientObj.phone}
               name="phone" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" className="form-control" placeholder="mm/dd/yyyy" value={patientObj.dob}  name="dob" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="ssn">Social Security Number:</label>
              <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.ssn} name="ssn" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="ssn">Insurance Provider:</label>
              <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.insuranceProvider} name="insuranceProvider" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="ssn">Insurance Group Number:</label>
              <input type="text" className="form-control" placeholder="xxx-xx-xxxx" value={patientObj.insuranceGroupNumber}  name="insuranceGroupNumber" readOnly/>
            </div>
          </div>
      </div>
    </div>
  </div>
    );
  }
}

export default Profile;
