import React, { Component } from 'react';
import CreateProfile from './register';
import  { Route, Switch,Link } from 'react-router-dom';
import LoginComponent from './login';
import Profile from '../profile/Profile';
import Doctors from '../profile/Doctor';
import AddDoctor from '../profile/AddDoctor';
import ReviewAppointment from './review';
import Appointment from '../profile/Appointment';

import './home.css';

const inputKeyword = {
      'width': '346px'
};
const parStyle = {
      'display': 'inline'
};
const parStyle2 = {
  'marginTop': '-20px',
  'marginLeft': '5px'
};
const inputProvider = {
      'width': '230px'
};
const heroStyle = {
      'border': '20px solid #444444'
};
const userColStyle = {
      'paddingLeft': '0px',
      'paddingRight': '50px'
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
  //  console.log("inside home..");
    return (
      <div className="container hero-container">
        <div className="row" style={heroStyle}>
          <div className="col-sm-2 left-nav" style={userColStyle}>
            <div className="user">
              <h4>APP NAME</h4>
              <span className="glyphicon glyphicon-user"></span>
              {this.props.authProps.isAuthenticated === false ?
              <p style={parStyle}>
              <Link to="/login"><span className="txt">Log in</span></Link>
              <Link to="/"><span className="txt span-block">Sign up</span></Link>
              </p>
              :<p style={parStyle2}>
                <span className="txt span-block">{this.props.authProps.account && this.props.authProps.account.firstName}</span>
               <Link to="/login"><span className="txt span-block" onClick={(auth) => this.props.authProps.handleAuthentication(false)}>Logout</span></Link>
              </p>
              }
            </div>
            <div className="appointments">
            <p>
              <span className="glyphicon glyphicon-home"></span>
              <Link to="/appointments"><span className="txt">MY</span>
              <span className="txt span-block">APPOINTMENTS</span></Link>
            </p>
            <p>
              <span className="glyphicon glyphicon-user"></span>
              <Link to="/profile"><span className="txt">PROFILE</span></Link>
            </p>
            <p>
              <span className="glyphicon glyphicon-calendar"></span>
              <Link to="/doctors"><span className="txt">SCHEDULE AN</span>
              <span className="txt span-block">APPOINTMENT</span></Link>
            </p>
            </div>
          </div>
          {/* <div className="col-sm-10">
           <CreateProfile  history={this.props.history} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
          </div> */}
          <div className="col-sm-10">
          <Switch>
          <Route
              exact={true}
              path="/"
              render={(props) => <CreateProfile {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/login"
              render={(props) => <LoginComponent {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/appointments"
              render={(props) => <Appointment {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              doctor={this.props.doctor}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/profile"
              render={(props) => <Profile {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/doctors"
              render={(props) => <Doctors {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              doctor={this.props.doctor}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/add-doctor"
              render={(props) => <AddDoctor {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              authProps={this.props.authProps}/>}
             />
             <Route
              path="/review-appointment"
              render={(props) => <ReviewAppointment {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              doctor={this.props.doctor}
              authProps={this.props.authProps}/>}
             />
          </Switch>
          </div>
          {/* <div className="col-sm-10">
            {this.state.appointmentRequested === false ?
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
              {this.state.searchClicked === false ?
              <div className="searchResults">
                  <p className="par">Your results will appear here</p>
                  <p className="par">after you search </p>
              </div>
            :<Card handleAppointment={this.handleAppointment}/>}
            </div>
            :<CreateProfile doctor={this.state.doctor} appointment={this.state.appointment} history={this.props.history} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>}
          </div>
        </div> */} 

      </div>
      </div>

    );
  }
}

export default Home;

