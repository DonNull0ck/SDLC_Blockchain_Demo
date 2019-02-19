import React, { Component } from 'react';
import logo from '../logo.svg';


class ReviewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row register-user review-dashboard">
				<div className="col-sm-12">
					<div className="panel panel-primary">
						<div className="panel-heading">REVIEW YOUR APPOINTMENT</div>
						<div className="panel-body">
							<div className="col-sm-3">
								<img src={logo} className="img-thumbnail" alt="DoctorPhoto" />
							</div>

							<div className="col-sm-5">
									<p>You have an appointment with Dr.{this.props.doctor.name}</p>
									<p><span className="glyphicon glyphicon-calendar"></span> {this.props.appointment.getMonth() + 1}/{this.props.appointment.getDate()}/{this.props.appointment.getFullYear()}</p>
									<p><span className="glyphicon glyphicon-time"></span> 9 am</p>
									<p><span className="glyphicon glyphicon-map-marker"></span>{this.props.doctor.address1}</p>
									<p><span className="glyphicon glyphicon-earphone"></span> {this.props.doctor.phone}</p>
									<p>Reason for Visit</p>
									<p>Headache</p>
							</div>

							<div className = "col-sm-4 review-appointments">
							<ul>
								<li><button type="submit" className="btn btn-primary" >SEND EMAIL</button></li>
								<li><button type="button" className="btn btn-primary"  >SEND TEXT</button></li>
								<li><button type="button" className="btn btn-primary"  >EDIT APPOINTMENT</button></li>
								
							</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ReviewAppointment;