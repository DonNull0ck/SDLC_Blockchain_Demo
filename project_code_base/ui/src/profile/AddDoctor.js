import React, { Component } from 'react';

import '../home/home.css';


const btnStyle = {
	'width': '120px',
	'marginLeft': '42%'
};

class AddDoctor extends Component {
  constructor (props) {
  super(props);

  this.state = {
    stackId: null,
    contractError:false,
    registered: false,
    doctor: {
        name:'Dr.Henry Richardson',
        type: 'Primary Care',
        phone:'412-123-4567',
        address1: 'Alleghney General Hospital',
        address2: '123 main street',
        zip:'12345',
        practice: '',
      },
      practiceAreas: []

  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.addPracticeAreas = this.addPracticeAreas.bind(this);
  this.removePracticeAreas = this.removePracticeAreas.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let fields = this.state.doctor;
    fields[name] = value;
    this.setState({fields});
  }

  addPracticeAreas(event){
    const state = this.state;
    
    if(state.doctor.practice !== ""){
        state.practiceAreas.push(state.doctor.practice);
        var x = document.getElementsByName("practice")[0];
         x.required = false;
        //console.log(x);
    }
    state.doctor.practice = '';
  }
  removePracticeAreas(event,index){
    const state = this.state;
    state.practiceAreas.splice(index,1);
    if(state.practiceAreas.length < 2){
        var x = document.getElementsByName("practice")[0];
         x.required = true;
    }
   // console.log(index);
  }
handleSubmit(event) {
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
   // let drizzle know we want to call the `setPatient` method with `value`
   const contract = drizzle.contracts.Doctors;

   if(!contract){
       this.setState({contractError:true});
       return;
   }
   let practiceAreasObj = {};
   this.state.practiceAreas.forEach(function(val,index){
        practiceAreasObj[index] = val;
   });
   
   let practiceAreasJSON = JSON.stringify(practiceAreasObj);
   const docObj = {
        docName: this.state.doctor.name,
        docType: this.state.doctor.type,
        phone: this.state.doctor.phone,
        address1: this.state.doctor.address1,
        address2: this.state.doctor.address2,
        zip: this.state.doctor.zip
      //  practiceAreas: drizzle.web3.utils.fromAscii(practiceAreasJSON)
  };
  //let gasEst =  contract.web3.eth.estimateGas();
  // console.log("gas required: " + gasEst);

  const stackId = contract.methods["addDoctor"].cacheSend(
            JSON.stringify(docObj),
            drizzle.web3.utils.fromAscii(practiceAreasJSON),
        {
            from: drizzleState.accounts[0], gas: 2000000});
            // save the `stackId` for later reference
            this.setState({ stackId });
}   
// get transaction status
getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;
 
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
 
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
 
    // otherwise, return the transaction status
    return transactions[txHash].status;
  };

  render() {
    if(this.getTxStatus() === "success"){
      //this.props.history.push('/profile');
    }
    //console.log(doctor);
    return (
    <div className="row register-user">
        <div className="col-sm-12">
            <div className="panel panel-primary" >
                <div className="panel-heading">Create Doctor</div>
                <div className="panel-body">
                    <p className="errorMessage">{this.state.contractError === true ? <span>Internal Error, Please try again later!</span>:null}</p>
                    <p className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
                    <form method="POST" name="SignupForm" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label htmlFor="name">Doctor Name:</label>
                                <input type="text" className="form-control" placeholder="Doctor Name"
                                value={this.state.doctor.name}
                                onChange={this.handleInputChange}
                                name="name" required/>
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="type">Doctor Type:</label>
                                <input type="text" className="form-control" placeholder="Doctor Type"
                                value={this.state.doctor.type}
                                onChange={this.handleInputChange}
                                name="type" required/>
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" className="form-control" placeholder="xxx-xxx-xxxx"
                                value={this.state.doctor.phone}
                                onChange={this.handleInputChange}
                                name="phone" required/>
                            </div>
                             <div className="form-group col-sm-6">
                                <label htmlFor="address1">Address1:</label>
                                <input type="text" className="form-control" placeholder="Address1"
                                value={this.state.doctor.address1}
                                onChange={this.handleInputChange}
                                name="address1" required/>
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="address1">Address2:</label>
                                <input type="text" className="form-control" placeholder="Address2"
                                value={this.state.doctor.address2}
                                onChange={this.handleInputChange}
                                name="address2" required/>
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="zip">Zip:</label>
                                <input type="text" className="form-control" placeholder="Zip"
                                value={this.state.doctor.zip}
                                onChange={this.handleInputChange}
                                name="zip" required/>
                            </div>
                            <div className="form-group col-sm-6">
                                <pre>
                                {this.state.practiceAreas.map((item,index) => 
                                    <p key={index} className="practice-areas">{item}<span className="practice-areas-cancel" onClick={(event) => this.removePracticeAreas(event,index)}>X</span></p>
                                )
                                }
                                </pre>
                                <label htmlFor="practice">Practice Areas:</label>
                                <input type="text" className="form-control" placeholder="Practice areas"
                                value={this.state.doctor.practice}
                                onChange={this.handleInputChange}
                                name="practice" required/>
                                <span className="btn btn-primary"  onClick={this.addPracticeAreas}>Add Practice</span>
                            </div>

                            <button type="submit" className="btn btn-primary" style={btnStyle}>Create Doctor</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>     
    );
  }
}

export default AddDoctor;

