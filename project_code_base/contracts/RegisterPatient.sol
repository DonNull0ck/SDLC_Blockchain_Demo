pragma solidity >=0.4.0 <0.6.0;

contract RegisterPatient {
  struct Patient {
        string userInfo;
        bytes32[] appointments;
        bool created;
    }

    mapping (address => Patient) patients;
    address[] public patientAccts;

    //method to create new patient
    function setPatient(string _user, bytes32 _appointments) public {
        //check if patient already exists
        require(patients[msg.sender].created == false, "account already exist!");


        Patient storage patient = patients[msg.sender];

        patient.userInfo = _user;
        patient.appointments.push(_appointments);
        patient.created = true;
        patientAccts.push(msg.sender) -1;
    }

//once the user is logged in call this method to set the appointment
    function setAppointment(bytes32 _appointment) public {
        Patient storage patient = patients[msg.sender];
        patient.appointments.push(_appointment);
    }


    function getPatients() public  view returns(address[]) {
        return patientAccts;
    }

    function getPatient() public view returns (string,bytes32[]) {
        return (patients[msg.sender].userInfo, patients[msg.sender].appointments);
    }

    function countPatients() public view returns (uint) {
        return patientAccts.length;
    }

}
