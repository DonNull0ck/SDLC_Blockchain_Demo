import React, { Component } from 'react';
import logo from '../logo.svg';
import docImg from '../DoctorImage.png'


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
								<img src={docImg} className="img-thumbnail" alt="DoctorPhoto" />
							</div>

							<div className="col-sm-5">
									<p className="par">You have an appointment with <b>Dr.{this.props.doctor.name}</b></p>
									<p className="par"><span className="glyphicon glyphicon-calendar"></span> {this.props.appointment.getMonth() + 1}/{this.props.appointment.getDate()}/{this.props.appointment.getFullYear()}</p>
									<p className="par"><span className="glyphicon glyphicon-time"></span> 9 am</p>
									<p className="par"><span className="glyphicon glyphicon-map-marker"></span>{this.props.doctor.address1}</p>
									<p className="par"><span className="glyphicon glyphicon-earphone"></span> {this.props.doctor.phone}</p>
									<p className="par">Reason for Visit</p>
									<p className="par">Headache</p>
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