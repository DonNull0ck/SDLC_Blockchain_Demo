pragma solidity >=0.4.0 <0.6.0;


contract Doctors {
    struct Doctor {
        uint id;
        string doctorObj;
        // string docName;
        // string docType;
        // string phone;
        // string address1;
        // string address2;
        // string zip;
        bytes32[] practiceAreas;
        bytes32[] appointments;
    }
    struct Date {
        uint id;
        //string date; // use it as an id as well
        bytes32[] dates;
    }
    struct Time {
        uint id; // use it as an id
        //bool free;
        bytes32[] times;
    }

    mapping (uint  => Date) public dates;
    mapping (uint => Time) public times;
    mapping (uint => Doctor) public doctors;
    uint[] public doctorsList;
    uint public doctorsCount;
    Date private date;

    //Time[] private _times;
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

    function addDoctor(string _doctor, bytes32 _practiceAreas) public {
        doctorsCount++; // so we cud use as an id
        Doctor storage doctor = doctors[doctorsCount];
        doctor.id = doctorsCount;
        doctor.doctorObj = _doctor;
        // doctor.docName = _doctor;
        // doctor.docType = _doctype;
        // doctor.phone = _phone;
        // doctor.address1 = _address1;
        // doctor.address2 = _address2;
        // doctor.zip = _zip;
        doctor.practiceAreas.push(_practiceAreas);
        doctorsList.push(doctorsCount) -1;
        addDate(doctorsCount, "03/20/2019");
        addDate(doctorsCount, "03/21/2019");
        addDate(doctorsCount, "03/22/2019");
        addDate(doctorsCount, "03/23/2019");
        addDate(doctorsCount, "03/24/2019");
        doctorAdded(doctorsCount);

      //  doctor.dates = _date;
        //doctors[doctorsCount] = Doctor(doctorsCount,_doctor, _doctype, _phone, _address1, _address2, _zip);
        //addDate(doctorsCount);
    }
    string[] appTimes;
    function addDate(uint _id, string _date) public {
      require(doctors[_id].id == _id, "doctor doesnt exist for that id!");
      Doctor storage doctor = doctors[_id];
      appTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];
      for(uint i=0; i < appTimes.length; i++){
              string memory _dateTimeBuilder = string(abi.encodePacked(" "));
              _dateTimeBuilder = string(abi.encodePacked(_date," ",appTimes[i]));
              bytes32 _dateBytes32 =  stringToBytes32(_dateTimeBuilder);
              doctor.appointments.push(_dateBytes32) -1;
      }

      //date.dates.push(_dateBytes32);
      //string memory _timeStringObj = "";
      //addTime(_id,_date,_timeStringObj);
      //  date = Date(_date,_time);
       //doctor.dates.push(date) -1;
    }
    function addTime(uint _id, string _date, string _time) public{
      //require(times[_date].date == _date, "date doesnt exist!");
      Time storage time = times[_id];
      bytes32 _timeBytes32 =  stringToBytes32(_time);
      time.times.push(_timeBytes32);
    }
    function getAllDoctors() public view returns(uint[]) {
      return doctorsList;
    }

    function getDoctor(uint _id) public view returns (string,bytes32[],bytes32[]) {
        Doctor memory doctor = doctors[_id];
        Date memory _dates = dates[_id];
        Time memory _times = times[_id];
        return (doctor.doctorObj,doctor.practiceAreas,doctor.appointments);
    }

    function stringToBytes32(string memory _source) returns (bytes32 result) {
      bytes memory tempEmptyStringTest = bytes(_source);
      if (tempEmptyStringTest.length == 0) {
          return 0x0;
        }

        assembly {
          result := mload(add(_source, 32))
        }
}

}
