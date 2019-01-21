pragma solidity ^0.4.22;


contract RegisterPatient {
  struct Patient { 
        string PatientName;
        string Patient_ID;
        string PatientForm_ID;
        string SSN;
        string DateOfBirth;
        string EmailAddress;
    }

  //mapping (address => Patient) public patients; 
   Patient[] public patientAccts;

  //setter to set patient
  function setPatient(string patient_name,string patient_id,
    string patient_formId, string ssn, string dob, string email){
    patientAccts.push(Patient(patient_name,patient_id,patient_formId,ssn,dob,email));
    
  }

  // getter to get patients
  // function getPatients() view public returns(Patient[]){
  //   return patientAccts;
  // }

}
