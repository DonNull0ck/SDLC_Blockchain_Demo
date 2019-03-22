import React, { Component } from 'react';
import Signup from './patient_form/Signup'
import Appointments from './appointments/Appointments'
import Home from './home/home'





import  { Route, Switch } from 'react-router-dom';

import './App.css';

const progressbar = {
  width:'100%',
  position: 'absolute',
  top: '0px'
};


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        loading: true,
        drizzleState: null,
        isAuthenticated: false,
        account:null,
        userId: null,
        doctor:[],
        appointment:null,
        accountRetrievedKey:null
    };
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleAccountRetrieveKey = this.handleAccountRetrieveKey.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleDoctor = this.handleDoctor.bind(this);
    this.handleUserId = this.handleUserId.bind(this);
  }

  handleAuthentication(isAuthenticated){
    this.setState({isAuthenticated});
  }
  handleAccountRetrieveKey(accountRetrievedKey){
    this.setState({accountRetrievedKey});
  }
  handleAccount(account){
    this.setState({account});
  }
  handleDoctor(doctor,appointment){
    this.setState({doctor});
    this.setState({appointment});
  }
  handleUserId(userId){
    this.setState({userId});
  }

  intializeDrizzle(){
    const {drizzle} = this.props;
        // subscribe to changes in the store
        this.unsubscribe = drizzle.store.subscribe(() => {
            // every time the store updates, grab the state from drizzle
            const drizzleState = drizzle.store.getState();

            // check to see if it's ready, if so, update local component state
            if (drizzleState.drizzleStatus.initialized) {
                this.setState({
                    loading: false,
                    drizzleState
                });
            }

        });
  }

  // once the component gets rendered intializeDrizzle
  //componentDidMount() is one of the react life cycle methods
  // it gets called once the render is called
  componentDidMount(){
    this.intializeDrizzle();
  }
  // once the component gets destroyed unsubscribe the drizzle state
  //compomentWillUnmount() is one of the react life cycle methods
  // it gets called once the dom is destroyed
    compomentWillUnmount() {
        this.unsubscribe();
    }

  render() {
 //   console.log("inside app..");
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      handleAuthentication: this.handleAuthentication,
      accountRetrievedKey: this.state.accountRetrievedKey,
      handleAccountRetrieveKey: this.handleAccountRetrieveKey,
      account: this.state.account,
      handleAccount: this.handleAccount,
      userId:this.state.userId,
      handleUserId: this.handleUserId
    };
    const doctor = {
      doctor: this.state.doctor,
      handleDoctor: this.handleDoctor,
      appointment: this.state.appointment
    };
    if (this.state.loading) return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="loading" aria-valuemin="0" aria-valuemax="100" style={progressbar}>
            loading drizzle..
          </div>
        </div>
      );
    return (
      <div className="App">
        <header className="App-header">
        <div className="container">
          <div className="page-header">
            <h2>Welcome to SDLC Blockchain Demo</h2>
          </div>
        </div>
            <Switch>
             <Route exact={true}
              path="/home"
              render={(props) => <Signup {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}/>}
             />
             <Route
              path="/appointments"
              render={(props) => <Appointments {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}/>}
             />
             <Route
              path="/doctors"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              doctor={doctor}
              authProps={authProps}/>}
             />
             <Route
              path="/add-doctor"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              authProps={authProps}/>}
             />
            <Route
              exact={true}
              path="/"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              authProps={authProps}/>}
             />
             <Route
              path="/login"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              authProps={authProps}/>}
             />
             <Route
              path="/profile"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              authProps={authProps}/>}
             />
             <Route
              path="/review-appointment"
              render={(props) => <Home {...props}
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              doctor={doctor}
              authProps={authProps}/>}
             />
            </Switch>

        </header>
      </div>
    );
  }
}

export default App;
