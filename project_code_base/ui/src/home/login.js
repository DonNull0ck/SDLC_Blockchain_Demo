import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const btnStyle = {
	'width': '120px',
	'marginLeft': '42%'
};
const parStyle = {
    'color': 'red'
};
const lgnbtnStyle = {
	'width': '120px',
	'display': 'block',
	'marginLeft': '42%',
	'marginTop': '20px',
	'border': '2px solid #2b5c92'

};

const leftPanelStyle = {
	'marginLeft': '30px',
	'marginTop': '25px'
};

class LoginComponent extends Component {
  constructor (props) {
  super(props);
    this.state = {
        stackId:null,
        dataKey:null,
        patientsAddressKey: null,
        accountRetrievedKey: null,
        contractError:false,
        params: null,
        user: {
            login:''
          }
      };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let fields = this.state.user;
    fields[name] = value;
    this.setState({fields});
  }
  
  componentDidMount(){
    const {drizzle,drizzleState} = this.props;
    const contract = drizzle.contracts.RegisterPatient;
    if(!contract){
      this.setState({contractError:true});
      return;
    }
    // if(Object.keys(this.props.match.params).length){
    //     this.setState({params:this.props.match.params});
    // }
    const dataKey = contract.methods["countPatients"].cacheCall(
         {
          from: drizzleState.accounts[0]
         });

    const patientsAddressKey = contract.methods["getPatients"].cacheCall(
        {
            from: drizzleState.accounts[0]
        }
    );
    // save the `dataKey` to local component state for later reference
    this.setState({dataKey});
    this.setState({patientsAddressKey});

  }

  handleSubmit(event) {
   event.preventDefault();
   const { drizzle, drizzleState } = this.props;

   // let drizzle know we want to call the `setPatient` method with `value`
   const contract = drizzle.contracts.RegisterPatient;
    let id = parseInt(this.state.user.login);
    const accountRetrievedKey = contract.methods["getPatient"].cacheCall(id,
      {
       from: drizzleState.accounts[0]
      });
      this.setState({accountRetrievedKey});
      this.props.authProps.handleUserId(id);
      
 }

 // get transaction status
 getTxStatus = () => {
   // get the transaction states from the drizzle state
   const { transactions, transactionStack } = this.props.drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[this.state.accountRetrievedKey];

   // if transaction hash does not exist, don't display anything
   if (!txHash) return null;

   // otherwise, return the transaction status
   return transactions[txHash].status;
 };
	
  render() {
    // if(this.props.location.params){
    //   const goto = this.props.location.params.goto;
    //   if(this.state.params == null){
    //     this.setState({params:goto});
    //     console.log(goto);
    //   }
    // }
    if(this.props.authProps.isAuthenticated){
      return(
        <p className="par-default">Would you like to logout?<Link to="/login"> Click Here!</Link></p>
      );
    }
    if(this.state.accountRetrievedKey !== null){
      this.props.authProps.handleAuthentication(true);
      this.props.authProps.handleAccountRetrieveKey(this.state.accountRetrievedKey);
      this.props.history.push('/profile');    
     
    }
    const { RegisterPatient } = this.props.drizzleState.contracts;
      // using the saved `dataKey`, get the variable we're interested in
    const patients = RegisterPatient.countPatients[this.state.dataKey]; //
    const patientsAddressArray = RegisterPatient.getPatients[this.state.patientsAddressKey];
    let patientArray = [];
    if(patientsAddressArray && patientsAddressArray.value.length > 0){
      patientsAddressArray.value.forEach(function(item,index){
        patientArray.push(item);
      });
        
    }
   // console.log("inside login " + patients);
    if(patients && patients.value === "0"){
        return (
        <div className="jumbotron">
            <Link to="/">
                <p>Click here to create a new account</p>
            </Link>
        </div>
        );
    }
    return (
      <div className="row register-user">
      <div className="col-sm-12">
        <div className="panel panel-primary" style={leftPanelStyle}>
        <div className="panel-heading">Select one account from below to sign in</div>
      <div className="panel-body">
      <p className="errorMessage">{this.state.contractError === true ? <span>Internal Error, Please try again later!</span>:null}</p>
      <p  className="errorMessage">{this.state.stackId != null? <span>Transaction Status:{this.getTxStatus()}</span>:null}</p>
  <form method="POST" name="LoginForm" onSubmit={this.handleSubmit}>
   <div className="row">
    <div className="form-group col-sm-12">
      <select className="form-control" 
      value={this.state.user.login}
      onChange={this.handleInputChange}
      name="login"
      required>
        <option></option>
        {patientArray.map(function(name, index){
            return <option  key={index} value={name}>{name}</option>;
        })}
      </select>
    </div>
        <button type="submit" className="btn btn-default" style={lgnbtnStyle}>Login</button>
        <p></p>
        <Link to="/">
            <button type="button" className="btn btn-primary" style={btnStyle}>Register</button>
        </Link>
        </div>
     </form>
    </div>
    </div>
    </div>
</div>      
    );
  }
}

export default LoginComponent;
