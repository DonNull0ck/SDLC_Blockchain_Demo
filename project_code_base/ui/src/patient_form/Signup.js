import React, { Component } from 'react';
import { Redirect} from 'react-dom';


import './Signup.css';


class Signup extends Component {
  constructor (props) {
  super(props);
  this.state = {
      PatientName: 'Jane Doe',
      Patient_ID: '123',
      PatientForm_ID: '1234',
      SSN: '123-45-6789',
      DateOfBirth: '',
      EmailAddress: 'janedoe@test.com',
      stackId: null,
      contractError: false
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
    
    // let drizzle know we want to call the `setPatient` method with `value`
    const contract = drizzle.contracts.RegisterPatient;

    if(!contract){
        this.setState({contractError:true});
        return;
    }

    const stackId = contract.methods["setPatient"].cacheSend(
          drizzleState.accounts[0],
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

  // get transaction obj
  getTx = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return transactions[txHash];
  };



  render() {
    if(this.getTxStatus() == "success"){
      this.props.history.push('/appointments');
    }
    return (
      <div className="container singup-form-container">
        <h2>Signup Here</h2>
          <p className="errorMessage">{this.state.contractError == true ? <span>Internal Error, Please try again later!</span>:null}</p>
          <p  className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
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
