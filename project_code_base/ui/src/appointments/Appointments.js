import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Appointments.css';

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      stackId: null,
      contractError: false,
      transactionStatus:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
    const { drizzle, drizzleState } = this.props;
  }

    handleSubmit(evt) {
        evt.preventDefault();
        const {drizzle,drizzleState} = this.props;
        const contract = drizzle.contracts.RegisterPatient;

        if(!contract){
            this.setState({contractError:true});
          return;
        }
        let month = this.state.startDate.getMonth() + 1;
        let date = this.state.startDate.getDate();
        let year = this.state.startDate.getFullYear();
        let stringDate = month + "/" + date + "/" + year;

        const stackId = contract.methods["setAppointment"].cacheSend(
            drizzleState.accounts[0],
            drizzle.web3.utils.fromAscii(stringDate),
            {
              from: drizzleState.accounts[0],
              gas: 100000
            });
        // save the `stackId` for later reference
        this.setState({
            stackId
        });
        let transactionStatus = this.getTxStatus();
        this.setState({
          transactionStatus
        });
    }

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
      this.props.history.push('/profile');
    }
    var disabled = this.state.startDate == null ? true:false;
    return (
      <div className="container">
        <h2>Pick your appointment here</h2>
        <div className="jumbotron">
        <p className="errorMessage">{this.state.contractError == true ? <span>Internal Error, Please try again later!</span>:null}</p>
          <p  className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
        <form  method="POST" name="Appointment" onSubmit={this.handleSubmit}>
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          <div>
            <button type="submit"  disabled={disabled} className="btn btn-lg btn-primary">Submit</button>
          </div>
        </form>
        </div>
      </div>
      
    );
  }
}

export default Appointments;
