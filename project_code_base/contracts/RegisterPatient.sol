pragma solidity >=0.4.0 <0.6.0;


contract RegisterPatient {
  struct Patient { 
        string PatientName;
        string Patient_ID;
        string PatientForm_ID;
        string SSN;
        string DateOfBirth;
        string EmailAddress;
        bytes32[] Appointments;
        bool Exists;
    }  
    
    //address owner;
   // string appointment;
    mapping (address => Patient) patients;
    address[] public patientAccts;
    event ErrorMessage(string  errorMessage);

    
    // constructor(){
    //     owner = msg.sender;
    // }

    function setPatient(address _address, string _name, string _id, string _formId, string _ssn, string _dob, string _email) public {
        //check if patient already exists
        if(patients[_address].Exists == true){
            ErrorMessage("You already have an account!");
            revert("You already have an account!");
            return;
        }
        
        
        var patient = patients[_address];
        
        patient.PatientName = _name;
        patient.Patient_ID = _id;
        patient.PatientForm_ID = _formId;
        patient.SSN = _ssn;
        patient.DateOfBirth = _dob;
        patient.EmailAddress = _email;
        patient.Exists = true;
        
        patientAccts.push(_address) -1;
    }
    
    function getPatients() view public returns(address[]) {
        return patientAccts;
    }
    
    function getPatient(address _address) view public returns (string,string,string,string,string,string,bytes32[]) {
        return (patients[_address].PatientName, patients[_address].Patient_ID, patients[_address].PatientForm_ID,patients[_address].SSN,patients[_address].DateOfBirth,patients[_address].EmailAddress,patients[_address].Appointments);
    }
    function setAppointment(address _address, bytes32 _app) public {
        if(msg.sender != _address){
            ErrorMessage("Account not same as sender!");
            revert("Account not same as sender!");
            return;
        }
        

        var patient = patients[_address];
        patient.Appointments.push(_app) -1;
    }
    // function getAppointment(address _address) view public returns (string) {
    //     return (appointment);
    // }
    
    function countPatients() view public returns (uint) {
        return patientAccts.length;
    }

}

