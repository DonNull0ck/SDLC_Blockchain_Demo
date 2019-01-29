import React, { Component } from 'react';
import Signup from './patient_form/Signup' 
import Appointments from './appointments/Appointments'
import Profile from './profile/Profile'



import  { Link, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

const progressbar = {
  width:'100%',
  position: 'absolute',
  top: '0px'
};


class App extends Component {
  state = {
        loading: true,
        drizzleState: null
    };

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
              path="/" 
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
              path="/profile" 
              render={(props) => <Profile {...props} 
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}/>}
             />    
            </Switch>
      
        </header>
      </div>
    );
  }
}

export default App;
