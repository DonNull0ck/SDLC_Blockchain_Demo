import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import logo from '../logo.svg';
import DoctorList from './doctors-json';
import  { Redirect,Route} from 'react-router-dom';
import CreateProfile from './register'


const btnStyle = {
      'width': '100%'
};
const imgStyle = {
      'width': '120px',
      'height': '120px'
};
const cardStyle = {
      'marginTop': '25px'
};

class Card extends Component {
  constructor (props) {
  super(props);

  this.state = {
      requestApp:false,
      doctor: null,
      createProfile:false,
      appointmentDate: null
    };

  this.clickSearch = this.clickSearch.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDate = this.handleDate.bind(this);
  }

  handleDate(date) {
    this.setState({
      appointmentDate: date
    });
  }
  //requestApp = false;
  clickSearch(event){
    event.preventDefault();
    this.setState({requestApp:!this.state.requestApp});
    
  }
  handleSubmit(event,data){
    event.preventDefault();
    this.setState({createProfile:true});
    this.setState({doctor:data});
    this.props.appointment(data);
  }



  render() {
    
    var arr = [];
      Object.keys(DoctorList).forEach(function(key) {
        arr.push(DoctorList[key]);
    });
      
    return (
      <div style={cardStyle}>
      {arr.map((item,index) => 
      <div className="row doctor-card" key={index}>
        <div className="col-sm-3">
          <img src={logo} className="img-thumbnail" style={imgStyle}/>
        </div>
      <div className="col-sm-6" >
        <h4>{item.name}</h4>
        <p className="par">{item.type}</p>
        <p className="par"><span className="glyphicon glyphicon-earphone"> </span> {item.phone}</p>
        <p className="par"><span className="glyphicon glyphicon-map-marker"></span>{item.address1}</p>
        <p className="par">{item.address2}</p> 
      </div>
      <div className="col-sm-3">
        <h5>Practice Areas </h5>
        {item.practice.map((itm,idx) =>
          <p className="par" key={idx}>{itm}</p>
        )}
        
        <button className="btn btn-primary" onClick={this.clickSearch}>{this.state.requestApp == false ? 'Request Appointment': 'Cancel'}</button>
      </div>
      {this.state.requestApp == true ?
        <div className="col-sm-12">
            <form method="POST">
              <DatePicker
                selected={this.state.appointmentDate}
                onChange={this.handleDate}
                minDate={new Date()}
                placeholderText="Please select your appointment date"
                className="apt-selector"
                required
              />
            <button type="submit" className="btn btn-primary" style={btnStyle} onClick={(e) => this.handleSubmit(e,item)}>REQUEST APPOINTMENT</button>
          </form>
        </div>
        :null}
        </div>
      )}
    </div>  
    );
  }
}

export default Card;
