pragma solidity >=0.4.0 <0.6.0;
import "./Doctor.sol";


contract RegisterPatient {
  struct Patient {
        uint id;
        string userInfo;
    }
    struct Appointment {
        uint id;
        bytes32[] appointments;
        bytes32[] reasonForVisit;
        uint[] doctorId;
    }

    mapping (uint => Patient) patients;
    mapping (uint => Appointment) appointments;
    uint public patientCounts;
    uint[] public patientAccts;
    //private Doctors doctor;
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
    function setAppointment(uint _id, bytes32 _appointment, uint _docId, uint _appIndex, bytes32 _reason, address _docAddress) public {
        Appointment storage appointment = appointments[_id];
      //  bytes32 _appBytes32 = string2Bytes32(_appointment);
        appointment.appointments.push(_appointment) -1;
        appointment.reasonForVisit.push(_reason) -1;
        appointment.doctorId.push(_docId) -1;
      //  uint castDocId = uint(_docId);
      //  uint castAppIndex = uint(_appIndex);
         Doctors doc = Doctors(_docAddress);
      //  bytes32  _pastApp = doc.appointments[_appIndex];
      //  doc.pastAppointments.push(_pastApp);
      //  delete doc.appointments[_appIndex];
       doc.removeAppointment(_docId,_appIndex);

    }


    function getPatients() public  view returns(uint[]) {
        return patientAccts;
    }

    function getPatient(uint _id) public view returns (string,bytes32[], bytes32[]) {
        return (patients[_id].userInfo, appointments[_id].appointments, appointments[_id].reasonForVisit);
    }
  //  bytes32[] docList;
  //  bytes32 _docInfoBytes32;
    //string docInfo;
    function getAppointment(uint _id,address _docAddress) public view returns (bytes32[],bytes32[],uint[]) {
        // Doctors doc = Doctors(_docAddress);
        // bytes[] docList;
        //   for(uint i=0; i < appointments[_id].doctorId.length; i++){
        //        string memory docInfo = doc.getDoctorInfo(appointments[_id].doctorId[i]);
        //       bytes memory _docInfoBytes32 =  string2Bytes256(docInfo);
        //       docList.push(_docInfoBytes32) -1;
        //     }
        return (appointments[_id].appointments, appointments[_id].reasonForVisit, appointments[_id].doctorId);
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
