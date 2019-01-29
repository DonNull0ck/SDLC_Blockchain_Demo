import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {

    state = {
      stackId:null,
      dataKey:null,
      patientsKey:null,
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
          drizzleState.accounts[0],
         {
          from: drizzleState.accounts[0], gas: 100000
         });


    // save the `dataKey` to local component state for later reference
    this.setState({dataKey});

    // get list of all patients
      const patientsKey = contract.methods["getPatients"].cacheCall(
          {
            from: drizzleState.accounts[0], gas: 100000
          }
        );
    this.setState({patientsKey});

  }
 

  render() {
    if(this.state.contractError){
      return (
        <p className="errorMessage"><span>Internal Error, Please try again later!</span></p>
      );
    }
    // get the contract state from drizzleState
     const { RegisterPatient } = this.props.drizzleState.contracts;
      //console.log(this.props.drizzleState.accounts);

      // using the saved `dataKey`, get the variable we're interested in
      const patientAccts = RegisterPatient.getPatient; // 
      const listOfAccts = RegisterPatient.getPatients;

      const key = this.state.dataKey;
      const patientAcct = patientAccts[key]; // retrieve particular one using the key
      const accts = listOfAccts[this.state.patientsKey];
      //const utils = this.props.drizzle.web3.utils;
      //console.log(patientAcct);
    if(!patientAcct){
        return (
          <div className="container">
            <div className="jumbotron">
              <p>You don't have any registered accounts yet!</p>
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
                <th>Your ID</th>
                <th>SSN</th>
                <th>Date Of Birth</th>
                <th>Email Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{patientAcct && patientAcct.value[0]}</td>
                <td>{patientAcct && patientAcct.value[1]}</td>
                <td>{patientAcct && patientAcct.value[3]}</td>
                <td>{patientAcct && patientAcct.value[4]}</td>
               <td>{patientAcct && patientAcct.value[5]}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
            <h2>Your upcoming appointments</h2>
            <ul className="list-group">
                {patientAcct.value[6].map(function(name, index){
                    return <li className="list-group-item list-group-item-info" key={index}>{name}</li>;
                  })}
            
            </ul>
        </div>
      </div>
      
    );
  }
}

export default Profile;
