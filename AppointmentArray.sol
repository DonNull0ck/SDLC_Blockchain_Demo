pragma solidity >=0.4.0 <0.6.0;
//pragma experimental ABIEncoderV2;
import "./Doctor.sol";
import "./RegisterPatient.sol";

// set all the inserts to true for simplicity
//This is adapted from below:
//https://ethereum.stackexchange.com/questions/11870/create-a-two-dimensional-array-in-solidity

//Try this to convert to mapping
//(uint256 => mapping (uint256 => bool)) m_pairsOfFlags; –

/*
This is how appointments are currently implemented
struct Appointment {
    uint id;
    bytes32[] appointments;
}
*/

contract AppointmentArray{


    struct Appointment {
    uint id;
    bytes appointments;
    }
    //bytes32[] appointments;


//Appointment[] appointments;
//appointments.push(Appointment(id, appointments)


/*
    function setAppointment(uint _id, string _appointment) public {
        Appointment storage appointment = appointments[_id];
        bytes32 _appBytes32 = string2Bytes32(_appointment);
        appointment.appointments.push(_appBytes32) -1;

    }
    */

  //This is a sample appointments block (account hash) from ganache
//Appointment hash: 0xa047c796ab7b58f2cb15b5e70cb2f1d705adfc99
//Account: 1

//Appointment intAppointment = Appointment(1,2) //works withuints


//Appointment  myAppointment = Appointment({_id:1, _appointments:2});

//Appointment myAppointment = Appointment(1,`0xa047c796ab7b58f2cb15b5e70cb2f1d705adfc99`);

//`606060405260188060106000396000f360606040523615600d57600d565b60165b6002565b565b00`

//Appointment myAppointment = Appointment({id:1, {appointments:1,"0xa047c796ab7b58f2cb15b5e70cb2f1d705adfc99"}});

//setAppointment.push(Appointment(id, appointments));

Appointment byteAppointment = Appointment(1,"0xa047c796ab7b58f2cb15b5e70cb2f1d705adfc99");

Appointment[32][] patientAppointments;


      // dynamic list of length 2 bools
    //Appointment[][] flags;

    function pushAppointment() {
        // append an array to the dynamic list of appointments
        patientAppointments.push([byteAppointment, byteAppointment]);
    }

    function appendAppointment() returns(uint length) {
       // append another array to the dynamic dimension, this time with a return
       return patientAppointments.push([byteAppointment,byteAppointment]);
    }


    /*
    //Uses features that were not added to later versions of solidity

    // return a count of length 32 arrays stored in Appointment;
    function getAppointmentsCount() constant returns(uint count) {
        return patientAppointments.length;
    }

    // return a length 2 array stored in the dynamic dimension
    // will throw if index > flags.length-1 (index starts at 0)
    function getAppointments(uint index) constant returns(Appointment [32] appointmentList) {
        return(patientAppointments[index]);
    }

    // return one appointment from the array
    function returnAppointment(uint dynamicIndex, uint lengthTwoIndex) constant returns(Appointment oneAppointment) {
        return patientAppointments[dynamicIndex][lengthTwoIndex];
    }
    */

}
