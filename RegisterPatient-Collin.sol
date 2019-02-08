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

    function setPatient(address _address, string memory _name, string memory _id, string memory _formId, string memory _ssn, string memory _dob, string memory _email) public {
        //check if patient already exists
        if(patients[_address].Exists == true){
            emit ErrorMessage("You already have an account!");
            revert("You already have an account!");
            //return;
        }

        RegisterPatient.Patient storage patient = patients[_address];

       // var patient = patients[_address];

        patient.PatientName = _name;
        patient.Patient_ID = _id;
        patient.PatientForm_ID = _formId;
        patient.SSN = _ssn;
        patient.DateOfBirth = _dob;
        patient.EmailAddress = _email;
        patient.Exists = true;

        patientAccts.push(_address) -1;
    }

    function getPatients() view public returns(address[] memory) {
        return patientAccts;
    }
    
    function getPatient(address _address) view public returns (string memory PatientName,  string memory Patient_ID,  string memory PatientForm_ID,
    string memory SSN, string memory DateOfBirth,  string memory EmailAddress , bytes32[] memory Appointments) {
        return (patients[_address].PatientName, patients[_address].Patient_ID, patients[_address].PatientForm_ID,patients[_address].SSN,patients[_address].DateOfBirth,patients[_address].EmailAddress,patients[_address].Appointments);
    }
    function setAppointment(address _address, bytes32 _app) public {
        if(msg.sender != _address){
            emit ErrorMessage("Account not same as sender!");
            revert("Account not same as sender!");
            //return;
        }


        //var patient = patients[_address];
        RegisterPatient.Patient storage patient = patients[_address];

        patient.Appointments.push(_app) -1;
    }
    // function getAppointment(address _address) view public returns (string) {
    //     return (appointment);
    // }

    function countPatients() view public returns (uint) {
        return patientAccts.length;
    }

}
