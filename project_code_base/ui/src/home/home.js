import React, { Component } from 'react';
import Card from './doctorCard';
import CreateProfile from './register';


import './home.css';

const inputKeyword = {
      'width': '596px'
};
const inputProvider = {
      'width': '389px'
};
const heroStyle = {
      'border': '20px solid #444444'
};
const userColStyle = {
      'paddingLeft': '0px',
      'paddingRight': '20px',
};

class Home extends Component {
  constructor (props) {
  super(props);

  this.state = {
    searchClicked:false,
    appointmentRequested:false,
    doctor: null,
    appointment: null
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleAppointment = this.handleAppointment.bind(this);
  }
handleAppointment(doc,date){
  this.setState({appointmentRequested:true});
  this.setState({doctor:doc});
  this.setState({appointment:date});
}


handleSubmit(event) {
    event.preventDefault();
    this.setState({searchClicked:true});
  }


  render() {
    return (
      <div className="container hero-container">
        <div className="row" style={heroStyle}>
          <div className="col-sm-2 left-nav" style={userColStyle}>
            <div className="user">
              <span className="glyphicon glyphicon-user"></span>
              <span className="txt"><a href="#/">Log in</a></span>
              <span className="txt span-block"><a href="#/">Sign up</a></span>
            </div>
            <div className="appointments">
            <p>
              <span>Navigation</span>
            </p>
            <p>
              <span className="glyphicon glyphicon-home"></span>
              <a href="#/">
              <span className="txt">APPOINTMENTS</span></a>
            </p>
            <p>
              <span className="glyphicon glyphicon-user"></span>
              <span className="txt"><a href="#/">PROFILE</a></span>
            </p>

            <p>
              <span>Tools</span>
            </p>
            <p>
              <span className="glyphicon glyphicon-calendar"></span>
              <a href="#/"><span className="txt">SCHEDULE AN</span>
              <span className="txt span-block">APPOINTMENT</span></a>
            </p>
            </div>
          </div>
          <div className="col-sm-10">
            {this.state.appointmentRequested === false ?
            <div className="">
              <p className="par search-title">Search for Caregivers</p>
              <form className="form-inline" method="POST"  onSubmit={this.handleSubmit}>
                <div className="form-group">
                <input type="text" className="form-control" style={inputKeyword} placeholder="Enter name,specialty,condition,practice or keyword" name="keyword"/>
                </div>
                <div className="form-group form-padding-left">
                  <input type="text" className="form-control" placeholder="Zip code or address" name="address"/>
                </div>
                <div className="form-group form-padding-left form-padding-right">
                  <input type="text" className="form-control" style={inputProvider} placeholder="Insurance provider and plan" name="provider"/>
                </div>
                <button type="submit" className="btn btn-primary btn-md"> SEARCH </button>
              </form>
              {this.state.searchClicked === false ?
              <div className="searchResults">
                  <p className="par">Your results will appear here</p>
                  <p className="par">after you search </p>
              </div>
            :<Card handleAppointment={this.handleAppointment}/>}
            </div>
            :<CreateProfile doctor={this.state.doctor} appointment={this.state.appointment} history={this.props.history} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>}
          </div>
        </div>

      </div>

    );
  }
}

export default Home;

