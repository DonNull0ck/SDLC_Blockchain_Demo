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
        bytes32[] practiceAreas;
        Date[] dates;
    }
    struct Date {
        string date; // use it as an id as well
        bytes32[] time;
    }
    struct Time {
        bool free;
        string time;
    }
    //mapping (string => Date) public availableDates;
  //  mapping (string => Time) public availableTimes;
    mapping (uint => Doctor) public doctors;
    uint[] public doctorsList;
    uint public doctorsCount;
    Date private date;
    Time[] private _times;
    event doctorAdded(
      uint indexed _doctorId
    );

    //constructor
    constructor () public {
    //  _times = [(true,"9:00 am"),(true,"10:00 am"),(true,"11:00 am")];
      // _date = ( "02/18/2019", _times);
        //_time =  [Time(true,"9:00 am"), Time(true,"10:00 am")];
        // addDoctor("Dr.Jane Doe", "Primary Care", "412-123-456", "Alleghney General Hospital"
        // , "123 main street", "12345");
    }

    function addDoctor(string _doctor, string _doctype, string _phone, string _address1, string _address2, string _zip, bytes32 _practiceAreas) public {
        doctorsCount++; // so we cud use as an id
        Doctor storage doctor = doctors[doctorsCount];
        doctor.id = doctorsCount;
        doctor.docName = _doctor;
        doctor.docType = _doctype;
        doctor.phone = _phone;
        doctor.address1 = _address1;
        doctor.address2 = _address2;
        doctor.zip = _zip;
        doctor.practiceAreas.push(_practiceAreas);
        doctorsList.push(doctorsCount) -1;
        doctorAdded(doctorsCount);

      //  doctor.dates = _date;
        //doctors[doctorsCount] = Doctor(doctorsCount,_doctor, _doctype, _phone, _address1, _address2, _zip);
        //addDate(doctorsCount);
    }
    function addDate(uint _id, string _date, bytes32[] _time) public {
      require(doctors[_id].id == _id, "doctor doesnt exist for that id!");
        Doctor storage doctor = doctors[doctorsCount];
        date = Date(_date,_time);
       doctor.dates.push(date) -1;

    }
    function getAllDoctors() public view returns(uint[]) {
      return doctorsList;
    }

    function getDoctor(uint _id) public view returns (string,string,string,string,string,string,bytes32[]) {
          Doctor memory doctor = doctors[_id];
        return (doctor.docName, doctor.docType, doctor.phone,doctor.address1,doctor.address2,
                doctor.zip, doctor.practiceAreas);
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
