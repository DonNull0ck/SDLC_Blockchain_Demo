import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import logo from '../logo.svg';
import DoctorList from '../home/doctors-json';


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

class Doctors extends Component {
  constructor (props) {
  super(props);

  this.state = {
      requestApp:false,
      doctor: null,
      createProfile:false,
      appointmentDate: null,
      stackId:null,
      dataKey:null,
      contractError:false,
      doctorsList: [],
      doctorKeys: [],
      docPractice: []
    };

  this.clickSearch = this.clickSearch.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount(){
    const {drizzle,drizzleState} = this.props;
    const contract = drizzle.contracts.Doctors;
    if(!contract){
      this.setState({contractError:true});
      return;
    }

        const dataKey = contract.methods["getAllDoctors"].cacheCall(
            {
            from: drizzleState.accounts[0]
           });
        // save the `dataKey` to local component state for later reference
        this.setState({dataKey});
        const doctors = contract.methods.doctors; //
        this.setState({doctors});
        //const doctorKeys = [];
        const state = this.state;
        contract.methods.getAllDoctors().call().then(function(res){
                state.doctorKeys.push(res);
                let keys = state.doctorKeys[0];
                for(let i=0; i<keys.length;i++){
                    let doctor = contract.methods.getDoctor(keys[i]).call();
                    doctor.then(function(res){
                        state.doctorsList.push(res);
                        let doctorPractice = drizzle.web3.utils.toAscii(res[6][0]);
                       // let obj = JSON.parse(doctorPractice);
                        state.docPractice.push(res[6][0]);
                    })
                }
        });

        //listen for event
        contract.events
        .doctorAdded()
        .on('data', event =>{
          console.log(event);
          this.setState({doctorsList: [],doctorKeys:[],docPractice:[]});
          this.componentDidMount();
        });
       
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
  handleSubmit(event,doctor){
    event.preventDefault();
    this.setState({createProfile:true});
    this.setState({doctor:doctor});
    this.props.handleAppointment(doctor, this.state.appointmentDate);
  }



  render() {
    if(this.state.contractError){
        return (
          <p className="errorMessage"><span>Internal Error, Please try again later!</span></p>
        );
      }
    
      const driz = this.props.drizzle;
      //const utils = driz.web3.utils;
     if(this.state.doctorsList.length === 0){
        return (
          <p className="errorMessage"><span>Doctors list is empty!</span></p>
        );
      }
        return (
            <div style={cardStyle}>
            {this.state.doctorsList.map((item,index) => 
            <div className="row doctor-card" key={index}>
              <div className="col-sm-3">
                <img src={logo} alt="doctor-img" className="img-thumbnail" style={imgStyle}/>
              </div>
            <div className="col-sm-6" >
              <h4>{item[0]}</h4>
              <p className="par">{item[1]}</p>
              <p className="par"><span className="glyphicon glyphicon-earphone"> </span> {item[2]}</p>
              <p className="par"><span className="glyphicon glyphicon-map-marker"></span>{item[3]}</p>
              <p className="par">{item[4]}</p> 
            </div>
            <div className="col-sm-3">
              <h5>Practice Areas </h5>
              {item[6].map((itm,idx) =>
                //<input type="hidden"></input>
                //{utils.toAscii(itm).map((i,k) =>
                  <p className="par" key={idx}>{driz.web3.utils.toAscii(itm)}</p>
                //)}
                //}

                //<p className="par" key={idx}>{utils.toAscii(itm)}</p>
              )} 
              
              <button className="btn btn-primary" onClick={this.clickSearch}>{this.state.requestApp === false ? 'Request Appointment': 'Cancel'}</button>
            </div>
            {this.state.requestApp === true ?
              <div className="col-sm-12">
                  <form method="POST" onSubmit={(event) => this.handleSubmit(event,item)}>
                    <DatePicker
                      selected={this.state.appointmentDate}
                      onChange={this.handleDate}
                      minDate={new Date()}
                      placeholderText="Please select your appointment date"
                      className="apt-selector"
                      required
                    />
                  <button type="submit" className="btn btn-primary" style={btnStyle}>REQUEST APPOINTMENT</button>
                </form>
              </div>
              :null}
              </div>
            )}
          </div>  
          );
    
  }
}

export default Doctors;
