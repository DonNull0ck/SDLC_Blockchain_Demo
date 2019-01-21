import React, { Component } from 'react';

class Appointments extends Component {
  constructor (props) {
  super(props);
  this.state = {
    };
}

  render() {
    return (
      <div className="container">
        <h2>Pick your appointment here</h2>
        <div className="jumbotron">
          <p>This is appointment central! </p>
        </div>
      </div>
      
    );
  }
}

export default Appointments;
