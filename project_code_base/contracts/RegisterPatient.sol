pragma solidity >=0.4.0 <0.6.0;
import "./Doctor.sol";


contract RegisterPatient is Doctors {
  struct Patient {
        uint id;
        string userInfo;
    }
    struct Appointment {
        uint id;
        bytes32[] appointments;
    }

    mapping (uint => Patient) patients;
    mapping (uint => Appointment) appointments;
    uint public patientCounts;
    uint[] public patientAccts;
    event AccountNotFound(
      uint indexed _patientId
    );

    //method to create new patient
    function setPatient(string _user) public {
        patientCounts++;
      //  require(patients[msg.sender].created == false, "account already exist!");

        Patient storage patient = patients[patientCounts];

        patient.userInfo = _user;
     //   patient.appointments.push(_appointments);
        patientAccts.push(patientCounts) -1;
    }

//once the user is logged in call this method to set the appointment
    function setAppointment(uint _id, string _appointment) public {
        Appointment storage appointment = appointments[_id];
        bytes32 _appBytes32 = string2Bytes32(_appointment);
        appointment.appointments.push(_appBytes32) -1;
    }


    function getPatients() public  view returns(uint[]) {
        return patientAccts;
    }

    function getPatient(uint _id) public view returns (string,bytes32[]) {
        return (patients[_id].userInfo, appointments[_id].appointments);
    }

    function countPatients() public view returns (uint) {
        return patientAccts.length;
    }

    function string2Bytes32(string memory _source) private returns (bytes32 result) {
          bytes memory tempEmptyStringTest = bytes(_source);
          if (tempEmptyStringTest.length == 0) {
              return 0x0;
            }

            assembly {
              result := mload(add(_source, 32))
            }
    }

}
