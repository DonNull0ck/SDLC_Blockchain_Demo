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
      createProfile:false,
      appointmentDate: null,
      appointmentTime:null,
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
       // const doctors = contract.methods.doctors; //
        //this.setState({doctors});
        //const doctorKeys = [];
        const state = this.state;
        contract.methods.getAllDoctors().call().then(function(res){
                state.doctorKeys.push(res);
                let keys = state.doctorKeys[0]; // list of doctorkeys(id) in array 
                for(let i=0; i<keys.length;i++){ // for each id, get all doctor
                    let doctor = contract.methods.getDoctor(keys[i]).call();
                    doctor.then(function(res){
                        state.doctorsList.push(res);
                        //let doctorPractice = drizzle.web3.utils.toAscii(res[6][0]);
                       // let obj = JSON.parse(doctorPractice);
                        //state.docPractice.push(res[1][0]);
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
  toggleDateTime(event,id,_date){
      //event.preventDefault();
      this.setState({ appointmentDate: _date});
      var activeDateEls = document.getElementsByClassName("date");
      for(let i=0; i<activeDateEls.length; i++){
        activeDateEls[i].classList.remove("active");
      }
      var allToggleList = document.getElementsByClassName("dateToggle");     
      for(let i=0; i<allToggleList.length; i++){
        allToggleList[i].classList.remove('in', 'active');
        allToggleList[i].style.display = "none";
      }

      var clickedEl = event.target;
      clickedEl.classList.add("active");
      
     // allToggleList.classList.remove('fade', 'in', 'active');
      var timeList = document.getElementById("dataToggle"+id);
      timeList.style.display = "block";
      timeList.classList.add('fade', 'in', 'active');
     // console.log(timeList);
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
    if(this.state.clickedIndex === index){
      this.setState({clickedIndex: null});
      return;
    }
    this.setState({clickedIndex: index});
    
  }
  handleSubmit(event,doctor){
    event.preventDefault();
    //this.setState({createProfile:true});
    //this.setState({doctor:doctor});
    const dateObj = {"date": this.state.appointmentDate, "time": this.state.appointmentTime};
    this.props.doctor.handleDoctor(doctor,dateObj);
    this.props.history.push('/review-appointment');  
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
     const datesJSON = [];
     const timesJSON = [];
     const timeObj = [];


     if(this.state.doctorsList.length === 0){
        return (
          <p className="errorMessage"><span>Doctors list is empty!</span></p>
        );
      }
      if(this.state.doctorsList.length) {
       // console.log(this.state.doctorsList);
        this.state.doctorsList.forEach(function(val,index){
          docListJSON.push(val["0"]);
          let practiceBytes32 = val["1"][0];
          let bytesToJSONstring = driz.web3.utils.toAscii(practiceBytes32);
          docPracticeJSON.push(bytesToJSONstring);
          datesJSON.push(val["2"]);
          timesJSON.push(val["3"]);
          //timeObj.push(driz.web3.utils.toAscii(val["3"]));
        });
      }
      if(docListJSON.length){
        docListJSON.forEach(function(val,index){
          //console.log("jsondoc: " + val);
          docList.push(JSON.parse(val));
         // console.log(timesJSON);
          
        });
        timesJSON.forEach(function(val,index){
          let _time = [];
          val.forEach(function(itm,index){
              let _asci = driz.web3.utils.toAscii(itm);
              let _trim = _asci.trim();
              let _replace = _trim.replace("[{", "{");
              let _concat = _replace.concat("}");
              let _obj = JSON.parse(_concat);
              _time.push(_obj);
          });
          timeObj.push(_time);
         //console.log(val);
          
        });
      // console.log(timeObj);
        // docPracticeJSON.forEach(function(val,index){
        //   //console.log("jsonpractice: " + val);
        //   let parsedJSON = '';
        //   try {
        //       parsedJSON = JSON.parse(val);
        //   }catch(e){
        //     let str = '';
        //     let jsonString = str.concat(val);
        //     //parsedJSON = JSON.parse(jsonString);
        //     //console.log(jsonString);
        //   }
    
        //   docPractice.push(parsedJSON);
        // });
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
                    <ul className="breadcrumb">
                      {datesJSON[index].map((dt,di) =>
                        <li className="date" id={"date"+di} key={di} onClick={(event) => this.toggleDateTime(event,di,driz.web3.utils.toAscii(dt))}>
                        {driz.web3.utils.toAscii(dt)}
                        </li>
                        
                      )}
                      
                    </ul>
                    {datesJSON[index].map((dt,di) => 
                      <ul key={di} className="dateToggle tab-pane fade" id={"dataToggle"+di}>
                          {timeObj[index].map((dtime,dti) => 
                            <li key={dti} className="list-group-item">
                            <input type="radio" name="appointmentTime"  onChange={(event) => this.handleTime(event,dtime.time)} required/><span style={timeStyle}>{dtime.free && dtime.time}</span>
                            </li>
                            // {dtime.map((val,ind) => 
                            //   <li key={ind}><a href="#/" >{driz.web3.utils.toAscii(val)}</a></li> 
                            // )} 
                         )}    
                      </ul> 
                    )}
                  
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
