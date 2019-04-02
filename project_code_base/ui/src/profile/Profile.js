import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';


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
        <h2>Profile</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>SSN</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Insurnace Group Number</th>
                <th>Insurnace Provider</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{patientObj.firstName} {patientObj.lastName}</td>
                <td>{patientObj.email}</td>
                <td>{patientObj.ssn}</td>
                <td>{patientObj.phone}</td>
                <td>{patientObj.dob}</td>
                <td>{patientObj.insuranceGroupNumber}</td>
                <td>{patientObj.insuranceProvider}</td>
              </tr>
            </tbody>
          </table>
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
