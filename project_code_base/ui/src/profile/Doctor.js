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
const loadingDoctor = {
   'width': '100%'
}
const appSelectStyle = {
  'width': '195px',
  'height': '49px',
  'marginBottom': '40px',
  'marginLeft': '49px'
}
const appSelectIcon = {
  'color':'white',
  'padding': '15px',
  'fontSize': '18px'
}
const selectIconContainer = {
  'width': '49px',
  'height': '49px',
  'marginTop': '-90px',
  'border': '1px solid #81c3d7',
  'background':'#81c3d7',
  'borderRadius': '4px',
  'borderTopRightRadius': '0px',
  'borderBottomRightRadius': '0px'
}
const requestAppDiv = {
  'position': 'absolute',
  'left': '-120%',
  'top': '155%'
}

class Doctors extends Component {
  constructor (props) {
  super(props);

  this.state = {
      requestApp:false,
      doctor: null,
      docId:null,
      appIndex:null,
      createProfile:false,
      app: {appointmentDate: ''},
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
  this.addMinDate = this.addMinDate.bind(this);
  this.addMaxDate = this.addMaxDate.bind(this);
  this.filterDates = this.filterDates.bind(this);
  this.getLocalDateTimeString = this.getLocalDateTimeString.bind(this);
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
  handleDate(event,docId){
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    let fields = this.state.app;
    fields[name] = new Date(value);
    this.setState({fields});
    // this.setState({
    //   appointmentDate: new Date(value)
    // });
    console.log("docId: " + docId);
   this.setState({docId});
   this.setState({appIndex:target.selectedIndex -1 });
  }
  //requestApp = false;
  clickSearch(event,index){
    event.preventDefault();
    this.setState({requestApp:!this.state.requestApp});
   // this.setState({dateNotSelected:false});
   // let field = this.state.app;
  //  field.appointmentDate = '';
   // this.setState({field});
    if(this.state.clickedIndex === index){
      this.setState({clickedIndex: null});
      return;
    }
    this.setState({clickedIndex: index});
    
  }
  handleSubmit(event,doctor){
   event.preventDefault();
    // if(this.state.app.appointmentDate === ''){
    //   console.log("handle submit: ");
    //     this.setState({dateNotSelected:true});
    //     return;
    // }
   // this.setState({dateNotSelected:false});
   
    let _appIndex = this.state.appIndex.toString();
    
    const dateObj = this.state.app.appointmentDate;
    this.props.doctor.handleDoctor(doctor,dateObj,this.state.docId,_appIndex);
    this.props.history.push('/review-appointment');  
  }

  getLocalDateString(date){
    return new Date(date).toLocaleDateString();
  }
  getLocalTimeString(date){
    return new Date(date).toLocaleTimeString();
  }
  getLocalDateTimeString(date){
    let _date = new Date(date);
    let _localDate = _date.toDateString();
    let _localTime = _date.toLocaleTimeString();
    return _localDate + " " + _localTime;
  }

  addMinDate(date){
      let dateArray = date;
      const _utils = this.props.drizzle.web3.utils;
     // let _minDate = _utils.toAscii(dateArray[0]);
      let timeArray = [];
      for(let i=0; i<dateArray.length; i++){
        let temp = _utils.toAscii(dateArray[i]);
        timeArray.push(new Date(temp));
      }
      return timeArray;
  }
  addMaxDate(date){
    let dateArray = date;
    const _utils = this.props.drizzle.web3.utils;
    let _maxDate = _utils.toAscii(dateArray[dateArray.length - 1]);
    return new Date((_maxDate));
  }
  filterDates(dates){
    let dateArray = dates[0];
    let uniqueDates = [];
    const _utils = this.props.drizzle.web3.utils;
    for(let i=0; i<dateArray.length; i++){
      let temp = _utils.toAscii(dateArray[i]);
      uniqueDates.push(this.getLocalDateString(temp));
    }
    let unique = src => [...new Set(src)];
    return unique(uniqueDates);
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
     const timesJSON = [];

     if(this.state.doctorsList.length === 0){
        return (
          <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="loading" aria-valuemin="0" aria-valuemax="100" style={loadingDoctor}>
            loading doctor..
          </div>
        );
      }
      const state = this.state;
      if(this.state.doctorsList.length) {
     //  console.log(this.state.doctorsList);
        this.state.doctorsList.forEach(function(val,index){
          docListJSON.push(val["0"]);
          let practiceBytes32 = val["1"][0];
          let bytesToJSONstring = driz.web3.utils.hexToString(practiceBytes32);
           let practiceObj = JSON.parse(bytesToJSONstring);
           let tempArray = [];
           for(let i in practiceObj){
              tempArray.push(practiceObj[i]);
           }
          // console.log(practiceObj);
          docPracticeJSON.push(tempArray);
          let dateObj = {
                  "id": state.doctorKeys[0][index],
                  "times": val[2]
          };
          dates32bytes.push(dateObj);
        });
       // console.log(docPracticeJSON);
      }
      if(docListJSON.length){
        docListJSON.forEach(function(val,index){
          //console.log("jsondoc: " + val);
          docList.push(JSON.parse(val));
         // console.log(timesJSON);
          
        });
      // console.log(dates32bytes);
        const current = this;
        dates32bytes.forEach(function(value,index){
            let dates = [value.times];
            let temp = current.filterDates(dates);
          //  console.log(temp);
            datesJSON.push(temp);
            timesJSON.push(dates);
        //  });
          
     //  console.log(docPracticeJSON);
          
        });
      }
        return (
            <div style={cardStyle}>
            {docList.map((item,index) => 
            <div className="row doctor-card" key={index} index={index}>
              <div className="col-sm-2">
                <img src={logo} alt="doctor-img" className="img-thumbnail" style={imgStyle}/>
              </div>
              <div className="col-sm-4">
              <h4>{item.docName}</h4>
              <p className="par">{item.docType}</p>
              <p className="par"><span className="glyphicon glyphicon-earphone"> </span> {item.phone}</p>
              <p className="par"><span className="glyphicon glyphicon-map-marker"></span>{item.address1}</p>
              <p className="par">{item.address2}</p> 
              </div>
            <div className="col-sm-2">
              <h5>Practice Areas </h5>
              {/* <p className="par" >{docPracticeJSON[index]}</p> */}
             {docPracticeJSON[index].map((itm,idx) =>
                  <p className="par" key={idx}>{itm}</p>
              )} 
              {/* {this.props.authProps.isAuthenticated === false ?
              <Link to={{pathname: '/login', params: {goto: "/doctors"} }} className="btn btn-primary">Login to request an appointment</Link> 
              :
              <button className="btn btn-primary" onClick={(event) => this.clickSearch(event,index)}>{this.state.clickedIndex !== index ? 'Request Appointment': 'Cancel'}</button>
              } */}

            </div>
            <div className="col-sm-3">
            <form method="POST" name="AppForm" onSubmit={(event) => this.handleSubmit(event,item)}>
            <div className="form-group">
              <select className="form-control"	style={appSelectStyle}
              value={this.state.appointmentDate}
              onChange={(event) => this.handleDate(event,this.state.doctorKeys[0][index])}
              name="appointmentDate"
              required
              >
                <option></option>
                {timesJSON[index][0].map((dt,di) =>
                  <option  key={di} value={driz.web3.utils.toAscii(dt)} index={di}>{this.getLocalDateTimeString(driz.web3.utils.toAscii(dt))}</option>
                )}
             </select>
             <div style={selectIconContainer}>
    	         <span className="glyphicon glyphicon-time" style={appSelectIcon}>
          	  </span>
            </div>
            </div>
            {this.props.authProps.isAuthenticated === false ?
              <Link to={{pathname: '/login', params: {goto: "/doctors"} }} className="btn btn-primary">Login to request an appointment</Link> 
              :
              <button className="btn btn-primary" onClick={(event) => this.clickSearch(event,index)}>{this.state.clickedIndex !== index ? 'Request Appointment': 'Cancel'}</button>
              }
              <div className="col-sm-12" style={requestAppDiv}>
              {this.state.clickedIndex === index ?
                <button type="submit" className="btn btn-primary" style={btnStyle}>REQUEST APPOINTMENT</button>
                :null
              }
              </div>
            </form>
            </div>
            {/* {this.state.clickedIndex === index ?
              <div className="col-sm-12">
                  <form method="POST" onSubmit={(event) => this.handleSubmit(event,item)}>
                    <input type="hidden" value={this.state.doctorKeys[0][index]}></input>
                    {this.state.dateNotSelected === true ? 
                    <p className="alert alert-danger">Please pick date and time!</p>
                    :null
                    }
                    <ul className="tab-pane fade in">
                      {timesJSON[index][0].map((dt,di) =>
                        <li className="date list-group-item" id={"date"+di} key={di} onClick={(event) => this.toggleDateTime(event,driz.web3.utils.toAscii(dt),this.state.doctorKeys[0][index],di)}>
                           {this.getLocalDateString(driz.web3.utils.toAscii(dt))} {this.getLocalTimeString(driz.web3.utils.toAscii(dt))}
                        </li>
                      )}
                      
                    </ul>
                    
                  <button type="submit" className="btn btn-primary" style={btnStyle}>REQUEST APPOINTMENT</button>
                </form>
              </div>
              :null} */}
              </div>
            )}
          </div>  
          );
    
  }
}

export default Doctors;
