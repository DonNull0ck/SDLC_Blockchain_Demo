import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const buttonStyle = {
	'width': '200px'
};
class ReviewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stackId:null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		let reasonForVisit = event.target[0].value;
		let date = this.props.doctor.appointment.toLocaleDateString();
        // let date = this.props.doctor.appointment.getDate();
        // let year = this.props.doctor.appointment.getFullYear();
        // let stringDate = month + "/" + date + "/" + year;
		let time = this.props.doctor.appointment.toLocaleTimeString();
	
   	let appObj = {
      		"date": date,
      		"time": time
		};
		const { drizzle, drizzleState } = this.props;

		let appStringDate = date + " " + time;
		const contract = drizzle.contracts.RegisterPatient;
		const doctorAddress = drizzle.contracts.Doctors.address;
		//console.log("doc address: " + doctorAddress);
		const userId = this.props.authProps.userId;

	//	let gasEst =  contract.web3.eth.estimateGas();
	//	console.log("gas required: " + gasEst);

		const stackId = contract.methods["setAppointment"].cacheSend(
		   userId,
			 drizzle.web3.utils.fromAscii(appStringDate),
			 this.props.doctor.docId,
			 this.props.doctor.appIndex,
			 drizzle.web3.utils.fromAscii(reasonForVisit),
			 doctorAddress,
		   {
			from: drizzleState.accounts[0], gas: 2000000});
		//  save the `stackId` for later reference
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
		if(!this.props.authProps.isAuthenticated){
			return (
			  <p className="errorMessage"><span>Please login first <Link to="/login">click here!</Link></span></p>
			);
		  }
		if(this.getTxStatus() === "success"){
			this.props.history.push('/appointments');
		}
		
		return (
			<div className="row register-user review-dashboard">
				<div className="col-sm-12">
					<div className="panel panel-primary">
						<div className="panel-heading">REVIEW YOUR APPOINTMENT</div>
						<div className="panel-body">
						<p  className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
							<div className="col-sm-3">
								<img src={logo} className="img-thumbnail" alt="DoctorPhoto" />
							</div>
						<form method="POST" name="ReviewForm" onSubmit={this.handleSubmit}>
							<div className="col-sm-5">
									<p>You are about to make an appointment with <b>{this.props.doctor.doctor.docName}</b></p>
									<p><span className="glyphicon glyphicon-calendar"></span> {this.props.doctor.appointment.toLocaleDateString()}</p>
									<p><span className="glyphicon glyphicon-time"></span> {this.props.doctor.appointment.toLocaleTimeString()}</p>
									<p><span className="glyphicon glyphicon-map-marker"></span>{this.props.doctor.doctor.address1}</p>
									<p><span className="glyphicon glyphicon-earphone"></span> {this.props.doctor.doctor.phone}</p>
									<p>Reason for Visit(Required)</p>
									<textarea className="form-control" rows="5" name="reasonforvisit" required></textarea>
							</div>

							<div className = "col-sm-4 review-appointments">
							<ul>
								<li><button type="submit" className="btn btn-primary" >CONFIRM APPOINTMENT</button></li>
								<li><Link  className="btn btn-primary"  to="/doctors" style={buttonStyle}>GO BACK</Link></li>
								
							</ul>
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default ReviewAppointment;