import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {

    state = {
      stackId:null,
      dataKey:null,
      contractError:false
    };

  componentDidMount(){
    const {drizzle,drizzleState} = this.props;
    const contract = drizzle.contracts.RegisterPatient;
    if(!contract){
      this.setState({contractError:true});
      return;
    }

    const dataKey = contract.methods["getPatient"].cacheCall(
         {
          from: drizzleState.accounts[0]
         });


    // save the `dataKey` to local component state for later reference
    this.setState({dataKey});

  }


  render() {
    if(this.state.contractError){
      return (
        <p className="errorMessage"><span>Internal Error, Please try again later!</span></p>
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
              <p>Sign in or Register first!</p>
            </div>
          </div>
        );
      }
    return (
      <div className="container">
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
