import React, { Component } from 'react';
import { Redirect} from 'react-dom';


import './Signup.css';

const errorMessage = {
      color: 'red',
      textAlign: 'center'
};

class Signup extends Component {
  constructor (props) {
  super(props);
  this.state = {
      PatientName: 'Bhim Dahal',
      Patient_ID: '',
      PatientForm_ID: '',
      SSN: '',
      DateOfBirth: '',
      EmailAddress: '',
      stackId: null
    };

  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
   handleSubmit(event) {
    console.log('A form is submitted: ' + event);
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.RegisterPatient;

    // let drizzle know we want to call the `setPatient` method with `value`
    try {
        const stackId = contract.methods["setPatient"].cacheSend(
          this.state.PatientName,
          this.state.Patient_ID,
          this.state.PatientForm_ID,
          this.state.SSN,
          this.state.DateOfBirth,
          this.state.EmailAddress,
         {
          from: drizzleState.accounts[0], gas: 500000});
        // save the `stackId` for later reference
      this.setState({ stackId });
    }catch(error){
      document.getElementById("errorMessage").style.display = 'block';
      console.error(error);
      return;
    }
    
    // if successfully posted the data
    // if(this.getTxStatus()){
    //   this.props.history.push('/appointments');
    // }else {
    //   //this.setState({errorPosting:true});
    //   document.getElementById("errorMessage").style.display = 'block';
    // }
    
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
    if(this.getTxStatus() == "success"){
      this.props.history.push('/appointments');
    }
    return (
      <div className="container singup-form-container">
        <h2>Signup Here</h2>
          <p id="errorMessage" style={errorMessage}>{this.getTxStatus() == "error" ? <span>Transaction Error!</span>:null}</p>
      <form  method="POST" name="SignupForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input 
          type="text" 
          value={this.state.PatientName} 
          onChange={this.handleInputChange} 
          className="form-control" id="PatientName" 
          placeholder="Enter Name" name="PatientName" required/>
        </div>
         <div className="form-group">
          <input type="text" 
          value={this.state.Patient_ID} 
          onChange={this.handleInputChange} 
          className="form-control" id="Patient_ID" 
          placeholder="Enter ID" name="Patient_ID" required/>
        </div>
        <div className="form-group">
          <input type="text" 
          value={this.state.PatientForm_ID} 
          onChange={this.handleInputChange} 
          className="form-control" id="PatientForm_ID" 
          placeholder="Enter Form ID" name="PatientForm_ID" required/>
        </div>
        <div className="form-group">
          <input type="text" 
          value={this.state.SSN} 
          onChange={this.handleInputChange} 
          className="form-control" id="SSN" 
          placeholder="Enter ssn" name="SSN" required/>
        </div>
        <div className="form-group">
          <input type="date" 
          value={this.state.DateOfBirth} 
          onChange={this.handleInputChange} 
          className="form-control" id="DateOfBirth" 
          placeholder="Enter Date of Birth" name="DateOfBirth" required/>
        </div>
        <div className="form-group">
          <input type="email" 
          value={this.state.EmailAddress} 
          onChange={this.handleInputChange} 
          className="form-control" id="EmailAddress" 
          placeholder="Enter email" name="EmailAddress" required/>
        </div>
      <button type="submit"  className="btn btn-lg btn-primary">Submit</button>
      </form>
      </div>
      
    );
  }
}

export default Signup;
