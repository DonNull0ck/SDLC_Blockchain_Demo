import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import AppointmentList from './AppointmentList';


class Appointment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      stackId:null,
      dataKey:null,
      contractError:false,
      profileAdded: false
    };
  }

  componentDidMount(){
    //const {drizzle,drizzleState} = this.props;
    const authenticated = this.props.authProps.isAuthenticated;
    if(authenticated){
      const dataKey = this.props.authProps.accountRetrievedKey;
      this.setState({dataKey});
    }

  };
  
  render() {
    if(this.state.dataKey === null){
      return (
       <Link to="/login">Please login here!</Link>
      );
    }
    return (
        <AppointmentList 
        userId={this.props.authProps.userId} 
        drizzle={this.props.drizzle} 
        drizzleState={this.props.drizzleState}/>
      );
    }
}

export default Appointment;
