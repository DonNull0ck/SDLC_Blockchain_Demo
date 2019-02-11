import React, { Component } from 'react';
import Card from './doctorCard';
import CreateProfile from './register';


import './home.css';

const inputKeyword = {
      'width': '346px'
};
const inputProvider = {
      'width': '230px'
};

class Home extends Component {
  constructor (props) {
  super(props);

  this.state = {
    searchClicked:false,
    appointmentRequested:false,
    doctor: null
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleAppStatus = this.handleAppStatus.bind(this);
  }
handleAppStatus(doc){
  this.setState({appointmentRequested:true});
  this.setState({doctor:doc});
}

handleSubmit(event) {
    event.preventDefault();
    this.setState({searchClicked:true});
  }


  render() {
    return (
      <div className="container hero-container">
        <div className="row">
          <div className="col-sm-2">
            <div className="user">
              <h4>APP NAME</h4>
              <span className="glyphicon glyphicon-user"></span>
              <span className="txt">Log in</span>
              <span className="txt span-block">Sign up</span>
            </div>
            <div className="appointments">
            <p>
              <span className="glyphicon glyphicon-home"></span>
              <span className="txt">MY</span>
              <span className="txt span-block">APPOINTMENTS</span>
            </p>
            <p>
              <span className="glyphicon glyphicon-user"></span>
              <span className="txt">PROFILE</span>
            </p>
            <p>
              <span className="glyphicon glyphicon-calendar"></span>
              <span className="txt">SCHEDULE AN</span>
              <span className="txt span-block">APPOINTMENT</span>
            </p>
            </div>
          </div>
          <div className="col-sm-10">
            {this.state.appointmentRequested == false ?
            <div className="">
              <p className="par">Search for Caregivers</p>
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
                <button type="submit" className="btn btn-primary btn-md"> Search </button>
              </form>
              {this.state.searchClicked == false ? 
              <div className="searchResults">
                  <p className="par">Your results will appear here</p>
                  <p className="par">after you search </p>
              </div>
            :<Card appointment={this.handleAppStatus}/>}
            </div>
            :<CreateProfile doctor={this.state.doctor}/>}
          </div>
        </div>
            
      </div>

    );
  }
}

export default Home;
