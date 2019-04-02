import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';


class AppointmentList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      stackId:null,
      dataKey:null,
      appointmentRetrievedKey: null,
      contractError:false,
      profileAdded: false,
      doctorsRetrieved: false,
      doctorsId: [],
      doctorsList: []
    };
    this.getLocalDateString = this.getLocalDateString.bind(this);
    this.getLocalTimeString = this.getLocalTimeString.bind(this);
  }

  componentDidMount(){
    //const {drizzle,drizzleState} = this.props;
    const userId = this.props.userId;
    const {drizzle,drizzleState} = this.props;
    const patientContract = drizzle.contracts.RegisterPatient;
    const doctorContract = drizzle.contracts.Doctors;
    const state = this.state;

    patientContract.methods.getAppointment(userId, doctorContract.address).call().then(function(res){
      state.doctorsId.push(res[2]);
     // console.log(res[2]);
      // let keys = state.doctorKeys[0]; // list of doctorkeys(id) in array 
      for(let i=0; i<state.doctorsId[0].length;i++){ // for each id, get all doctor
          let doctor = doctorContract.methods.getDoctorInfo(state.doctorsId[0][i]).call();
          doctor.then(function(res){
              state.doctorsList.push(res);
          })
      }
    });
    const appointmentRetrievedKey = patientContract.methods["getAppointment"].cacheCall(userId,
        doctorContract.address,
        {
         from: drizzleState.accounts[0]
        });
    this.setState({appointmentRetrievedKey});
 //   console.log(userId);
    
  };
  getLocalDateString(date){
    return new Date(date).toLocaleDateString();
  }
  getLocalTimeString(date){
    return new Date(date).toLocaleTimeString();
  }
  render() {
    // get the contract state from drizzleState
      const driz = this.props.drizzle;
     const { RegisterPatient } = this.props.drizzleState.contracts;      

      // using the saved `dataKey`, get the variable we're interested in
      const app = RegisterPatient.getAppointment[this.state.appointmentRetrievedKey]; //
      let docObj = [];
      let patientApp = null;
      if(app && app.value){
        patientApp = app.value[0];
      }
      if(!patientApp || !patientApp.length){
        return (
              <p className="errorMessage">You don't have any appointments!</p>
        );
      }
      const state = this.state;
      if(state.doctorsList.length !== 0){
          state.doctorsList.forEach(function(value,index){
            let doctor = JSON.parse(value);
            docObj.push(doctor);
           // console.log(doctor);
        });
        console.log(docObj[0]);
      }
    return (
      <div className="col-sm-12 myapp-container">
        <div className="panel panel-primary" >
                <div className="panel-heading">APPOINTMENT DETAILS</div>
                <div className="panel-body">
                  <table>
                    <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Doctor Name</th>
                      </tr>
                      </thead>
                    <tbody>
                    {patientApp.map((name, index) =>
                          <tr key={index} index={index}>
                            <td>{this.getLocalDateString(driz.web3.utils.hexToString(name))}</td>
                            <td>{this.getLocalTimeString(driz.web3.utils.hexToString(name))}</td>
                            <td>{docObj[index] && docObj[index].docName}</td>
                          </tr>
                    )}
                    </tbody>
                  </table>                    
                    {/* <div className="col-sm-4">
                        <ul className="list-group">
                             {patientApp.map(function(name, index){
                            return <li className="list-group-item list-group-item-info" key={index}>{driz.web3.utils.hexToString(name)}</li>;
                         })}
                        </ul>
                    </div> */}
            </div>
        </div>
      </div>
      
    );
  }
}

export default AppointmentList;
