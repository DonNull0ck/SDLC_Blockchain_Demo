pragma solidity >=0.4.0 <0.6.0;


contract Doctors {
    struct Doctor {
        uint id;
        string docName;
        string docType;
        string phone;
        string address1;
        string address2;
        string zip;
    }
    struct DateTime {
        uint id;
        string date;
        string[] time;
    }
    mapping (uint => DateTime) public availableTimes;
    mapping (uint => Doctor) public doctors;
    uint public doctorsCount;
    string private _date;
    string[] private _time;

    //constructor
    constructor () public {
        _date =  "02/18/2019";
        _time =  ["9:00 am","10:30 am","1:30 pm"];
        addDoctor("Dr.Jane Doe", "Primary Care", "412-123-456", "Alleghney General Hospital"
        , "123 main street", "12345", _date, _time);
    }

    function addDoctor(string _doctor, string _doctype, string _phone, string _address1, string _address2, string _zip, string _date, string[] _time) private {
        doctorsCount++; // so we cud use as an id
        Doctor storage doctor = doctors[doctorsCount];
        doctor.id = doctorsCount;
        doctor.docName = _doctor;
        doctor.docType = _doctype;
        doctor.phone = _phone;
        doctor.address1 = _address1;
        doctor.address2 = _address2;
        doctor.zip = _zip;
        //doctors[doctorsCount] = Doctor(doctorsCount,_doctor, _doctype, _phone, _address1, _address2, _zip);
        addTime(doctorsCount, _date, _time);
    }
    function addTime(uint _id, string _date, string[] _time) private {
        DateTime storage dateTime = availableTimes[_id];
        dateTime.id = _id;
        dateTime.date = _date;
        dateTime.time = _time;
       
    }

//     function stringToBytes32(string memory source) returns (bytes32 result) {
//       bytes memory tempEmptyStringTest = bytes(source);
//       if (tempEmptyStringTest.length == 0) {
//           return 0x0;
//         }
//
//         assembly {
//           result := mload(add(source, 32))
//         }
// }

}
