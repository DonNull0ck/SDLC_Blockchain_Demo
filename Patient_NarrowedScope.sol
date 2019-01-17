//import solidity

//finish appointment stuff

pragma solidity >=0.4.2 <0.6.0;
//^0.4.2; //pay attention to compiler version to avoid issues
//pragma experimental ABIEncoderV2;

//import * as PHI from "PatientForm.sol";
//import "PatientForm.sol" as PHI;
//import "./PatientForm.sol" ;
//import "PatientForm.sol";

contract Patient {

	string PatientFullName;
	uint Patient_ID;
	string PatientSSN;
	string PatientDateOfBirth;
	uint PatientAge;
	string PatientFullAddress;
	string PatientEmailAddress;
	string PatientPhone;
	string PatientEmployer;
	string PatientInsurancePlan;
	uint PatientInsuranceGroupNumber;
	bool PatientDependents;
	string PatientDependentName;
	uint[] PatientDependents_ID;
	string PatientSymptoms;
	string PatientPrimaryCarePhysician;
	string PatientMedicalHistory;
	string PatientAllergies;
	address PatientPaymentAddress;
	uint PatientForm_ID;
	struct Claims
	{
		string ClaimName;
		string Claim_ID;
		bool ClaimSubmitted;
		bool ClaimConfirmed;
		uint ClaimCostPatient;
		uint ClaimCostInsurance;
		uint ClaimCostTotal;
	}

	uint numClaims;
	mapping (uint => Claims) claims;

	struct Bills
	{
		string BillName;
		uint Bill_ID;
		bool BillPaid;
		uint BillCost;
		string BillIssuedTo;
		string BillIssuedBy;
	}

	uint numBills;
	mapping (uint => Bills) bills;

	struct Payments

	{
		uint Payment_ID;
		string Bill_ID;
		string Payment_Amount;
		string PaymentIssuedTo;
		string PaymentIssuedBy;
	}

	uint numPayments;
	mapping (uint => Payments) payments;

	struct Inquiries
	{
		uint Inquiry_ID;
		string InquirerName;
		string InquirerID;
		string InquiryAssignedToName;
		string  InquiryAssignedToID;
	  string InquirerDescription;
		bool InquiryOpen;
		bool InquiryClosed;
		string InquiryOpenDate;
		string InquiryCloseDate;
	}

	uint numInquiries;
	mapping (uint => numInquiries) inquiries;

	struct Appointments
	{
		string AppointmentName;
		uint Appointment_ID;
		string AppointmentDateTime;
		string AppointmentPatientName;
		string AppointmentPatient_ID;
		string AppointmentMedProName;
		string AppointmentMedPro_ID;
		bool AppointmentConfirmed;
		bool AppointmentCancelled;
	}
	uint numAppointments;
	mapping (uint => Appointments) appointments;


	/*functions:
	makeAppointment
	cancelAppointment
	confirmAppointment
	createPHI
	sendPHI
	payBill
	submitInquiry
	viewClaim
	*/

//make a new appointment (first rewwritten function)
function makeAppointment(string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
	string AppointmentPatientName, string AppointmentName)
	 public returns (string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
		string AppointmentPatientName, string AppointmentName)
{

appointments[Appointment_ID] = Appointments("My Appointment", 1, (now + 2), "John Smith", 1 );

	}

//create new appointment and delete old unconfirmed appointment
function  confirmAppointment(string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
	string AppointmentPatientName, string AppointmentName)
	 public returns (string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
		string AppointmentPatientName, string AppointmentName) {

require (appointment(Appointments).AppointmentPatientID > 0,
"There are no appointments on record to confirm."); //patient created an appointment

Appointments confirmedAppointment = myAppointment;

confirmedAppointment(Appointments).AppointmentConfirmed = true;

confirmedAppointment(Appointments).AppointmentConfirmedancelled = false;

delete myAppointment;
return confirmedAppointment;

}
//if a confirmed appointment exists, delete it.
function  cancelledAppointment(string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
	string AppointmentPatientName, string AppointmentName)
	 public returns (string AppointmentName, uint Appointment_ID, string AppointmentDateTime,
		string AppointmentPatientName, string AppointmentName) {

if(confirmedAppointment(Appointments).AppointmentConfirmed == true) //patient confirmed an appointment
    delete confirmedAppointment;

else if (myAppointment(Appointments).AppointmentPatientID > 0) { //patient created an unconfirmed appointment {

Appointments cancelledAppointmentAppointment = myAppointment;

cancelledAppointmentAppointment(Appointments).AppointmentConfirmed = false;

cancelledAppointmentAppointment(Appointments).AppointmentConfirmedancelled = true;

return cancelledAppointment;
}

else  break; {

}

}

//going to try passing the contract in as param, if you can't use comments below
function createPHI (PatientForm myPHI)
/*
(string PatientName,uint Patient_ID,uint PatientForm_ID,string SSN,string DateOfBirth,uint Age,
	string FullAddress,string EmailAddress,string Phone,string Employer,string InsurancePlan,
	uint InsuranceGroupNumber,bool Dependents,string DependentName,uint[] Dependents_ID,
	string Symptoms,string PrimaryCarePhysician,string MedicalHistory,string Allergies) */
public returns (PatientForm myPHI) {

PatientForm myPHI = PatientForm
({
PatientName: "John Smith",
Patient_ID: 1,
Patient_ID: 1,
SSN: 123456789,
FullAddress: "123 Main St Pittsburgh, PA 15220",
Phone: "412-555-1234",
Employer: "SDLC Partners L.P",
InsurancePlan: "Highmark BCBS",
InsuranceGroupNumber: 11111,
Dependents: true,
DependentName: "Mary Smith",
Dependents_ID: 1,
Symptoms: "Sneezing, coughing, scratchy throat, congestion, mild fever",
PrimaryCarePhysician: "Dr. Jane Miller",
MedicalHistory: "Tonsilectomy, Chicken Pox",
Allergies: "Shellfish"
});
}

function sendPHI (PatientForm)
/*(string PatientName,uint Patient_ID,uint PatientForm_ID,string SSN,string DateOfBirth,uint Age,
	string FullAddress,string EmailAddress,string Phone,string Employer,string InsurancePlan,
	uint InsuranceGroupNumber,bool Dependents,string DependentName,uint[] Dependents_ID,
	string Symptoms,string PrimaryCarePhysician,string MedicalHistory,string Allergies) */
public returns (PatientForm myPHI) {
	require(myPHI.Patient_ID > 0,
	"Patient Form has not been filled out. Please fill out a Patient Form and try again.");
	return myPHI;
}

function deposit() payBill payable {
	require(PatientPaymentAddress > 0,
	"Cannot send payment: No funds available.");
  PatientPaymentAddress[msg.sender] -= msg.value;
	//change bill status
}

}
