import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

import logo from '../logo.svg';

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

const timeStyle = {
  'marginLeft': '10px'
};

class Doctors extends Component {
  constructor (props) {
  super(props);

  this.state = {
      requestApp:false,
      doctor: null,
      docId:null,
      appIndex:null,
      createProfile:false,
      appointmentDate: null,
      appointmentTime:null,
      dateNotSelected:false,
      stackId:null,
      dataKey:null,
      contractError:false,
      clickedIndex: null,
      doctorsList: [],
      doctorKeys: [],
      docPractice: []
    };

  this.clickSearch = this.clickSearch.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDate = this.handleDate.bind(this);
  this.handleTime = this.handleTime.bind(this);
  this.toggleDateTime = this.toggleDateTime.bind(this);
  this.getLocalDateString = this.getLocalDateString.bind(this);
  this.getLocalTimeString = this.getLocalTimeString.bind(this);
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
        const state = this.state;
        contract.methods.getAllDoctors().call().then(function(res){
                state.doctorKeys.push(res);
                let keys = state.doctorKeys[0]; // list of doctorkeys(id) in array 
                for(let i=0; i<keys.length;i++){ // for each id, get all doctor
                    let doctor = contract.methods.getDoctor(keys[i]).call();
                    doctor.then(function(res){
                        state.doctorsList.push(res);
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
  toggleDateTime(event,_date,docId,appIndex){
      //event.preventDefault();
      this.setState({ appointmentDate: new Date(_date)});
      this.setState({dateNotSelected:false});
      this.setState({appIndex:appIndex});
      this.setState({docId});
      var DateEls = document.getElementsByClassName("date");
       for(let i=0; i<DateEls.length; i++){
         DateEls[i].classList.remove('label', 'label-success', 'dateSelected');
       }
       var clickedEl = event.target;
       
       clickedEl.classList.add('label','label-success', 'dateSelected');
  }
  handleTime(event,time) {
    event.preventDefault();
    this.setState({
      appointmentTime: time
    });
  }
  handleDate(event,date){
    event.preventDefault();
    this.setState({
      appointmentDate: date
    });
  }
  //requestApp = false;
  clickSearch(event,index){
    event.preventDefault();
    this.setState({requestApp:!this.state.requestApp});
    this.setState({dateNotSelected:false});
    this.setState({ appointmentDate: null});
    if(this.state.clickedIndex === index){
      this.setState({clickedIndex: null});
      return;
    }
    this.setState({clickedIndex: index});
    
  }
  handleSubmit(event,doctor){
    event.preventDefault();
    if(this.state.appointmentDate == null){
        this.setState({dateNotSelected:true});
        return;
    }
    this.setState({dateNotSelected:false});
   
    let _appIndex = this.state.appIndex.toString();
    
    const dateObj = this.state.appointmentDate;
    this.props.doctor.handleDoctor(doctor,dateObj,this.state.docId,_appIndex);
    this.props.history.push('/review-appointment');  
  }

  getLocalDateString(date){
    return new Date(date).toLocaleDateString();
  }
  getLocalTimeString(date){
    return new Date(date).toLocaleTimeString();
  }



  render() {
    if(this.state.contractError){
        return (
          <p className="errorMessage"><span>Internal Error, Please try again later!</span></p>
        );
      }
    
      const driz = this.props.drizzle;
     // const utils = driz.web3.utils;
     const docListJSON = [];
     const docList = [];
     const docPracticeJSON = [];
     const dates32bytes = [];
     const datesJSON = [];

     if(this.state.doctorsList.length === 0){
        return (
          <p className="errorMessage"><span>Doctors list is empty!</span></p>
        );
      }
      const state = this.state;
      if(this.state.doctorsList.length) {
     //  console.log(this.state.doctorsList);
        this.state.doctorsList.forEach(function(val,index){
          docListJSON.push(val["0"]);
          let practiceBytes32 = val["1"][0];
          let bytesToJSONstring = driz.web3.utils.toAscii(practiceBytes32);
          //let practiceObj = JSON.parse(bytesToJSONstring);
          //console.log(practiceObj);
          docPracticeJSON.push(bytesToJSONstring);
          let dateObj = {
                  "id": state.doctorKeys[0][index],
                  "times": val[2]
          };
          dates32bytes.push(dateObj);
        });
        console.log(docPracticeJSON);
      }
      if(docListJSON.length){
        docListJSON.forEach(function(val,index){
          //console.log("jsondoc: " + val);
          docList.push(JSON.parse(val));
         // console.log(timesJSON);
          
        });
      // console.log(dates32bytes);
        dates32bytes.forEach(function(value,index){
            let dates = [value.times];
            datesJSON.push(dates);
        //  });
          
        //console.log(docPracticeJSON);
          
        });
      }
        return (
            <div style={cardStyle}>
            {docList.map((item,index) => 
            <div className="row doctor-card" key={index} index={index}>
              <div className="col-sm-3">
                <img src={logo} alt="doctor-img" className="img-thumbnail" style={imgStyle}/>
              </div>
              <div className="col-sm-4">
              <h4>{item.docName}</h4>
              <p className="par">{item.docType}</p>
              <p className="par"><span className="glyphicon glyphicon-earphone"> </span> {item.phone}</p>
              <p className="par"><span className="glyphicon glyphicon-map-marker"></span>{item.address1}</p>
              <p className="par">{item.address2}</p> 
              </div>
            <div className="col-sm-5">
              <h5>Practice Areas </h5>
              <p className="par" >{docPracticeJSON[index]}</p>
             {/* {docPracticeJSON.map((itm,idx) =>
                  <p className="par" key={idx}>{itm}</p>
              )}  */}
              {this.props.authProps.isAuthenticated === false ?
              <Link to={{pathname: '/login', params: {goto: "/doctors"} }} className="btn btn-primary">Login to request an appointment</Link> 
              :
              <button className="btn btn-primary" onClick={(event) => this.clickSearch(event,index)}>{this.state.clickedIndex !== index ? 'Request Appointment': 'Cancel'}</button>
              }

            </div>
            {this.state.clickedIndex === index ?
              <div className="col-sm-12">
                  <form method="POST" onSubmit={(event) => this.handleSubmit(event,item)}>
                    {/* <DatePicker
                      selected={this.state.appointmentDate}
                      onChange={this.handleDate}
                      minDate={new Date()}
                      placeholderText="Please select your appointment date"
                      className="apt-selector"
                      required
                    /> */}
                    <input type="hidden" value={this.state.doctorKeys[0][index]}></input>
                    {this.state.dateNotSelected === true ? 
                    <p className="alert alert-danger">Please pick date and time!</p>
                    :null
                    }
                    <ul className="tab-pane fade in">
                      {datesJSON[index][0].map((dt,di) =>
                        <li className="date list-group-item" id={"date"+di} key={di} onClick={(event) => this.toggleDateTime(event,driz.web3.utils.toAscii(dt),this.state.doctorKeys[0][index],di)}>
                           {this.getLocalDateString(driz.web3.utils.toAscii(dt))} {this.getLocalTimeString(driz.web3.utils.toAscii(dt))}
                        </li>
                      )}
                      
                    </ul>
                  
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
