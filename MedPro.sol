//import solidity

pragma solidity >=0.4.2 <0.6.0;
 //pay attention to compiler version to avoid issues

//generalized class/contract, could be a doctor, nurse, surgeon, etc.
contract MedPro {

	string MedProFullName;
	string MedPro_ID;
	string MedProSSN;
	string MedProDateOfBirth;
	uint MedProAge;
	string MedProFullAddress;
	string MedProEmailAddress;
	string MedProPhone;
	string MedProEmployer;
	string[] InsurancePlansAccepted;
	string[] InsurancePlansInNetwork;
	string[] MedicalSupplies;
	uint TreatmentsPerformedTotal;
	uint TreatmentCostAvg;
	uint TreatmentCostMax;
	uint TreatmentCostMin;
	string PatientFormID;
	address PaymentAddress;

	//Examples: Exam, Surgery, Prescription, etc.
	struct Treatments {
		string TreatmentName;
		uint TreatmentID;
		string[] TreatmentSuppliesNeeded;
		string[] TreatmentSupplyID;
		uint TreatmentCost;
	}
	//Examples: MRI machine, Antibiotics, Scalpel
	struct Supplies
	{
		string SupplyName;
		uint SupplyID;
		uint SupplyCost;
		string[] SupplyRelatedTreatments;
		string[] SupplyRelatedTreatmentIDs;
		string SupplyStatusScapel;
	}
	struct Claims
	{
		string ClaimName;
		uint Claim_ID;
		bool ClaimSubmitted;
		bool ClaimConfirmed;
		uint ClaimCostPatient;
		uint ClaimCostInsurance;
	}
	struct Bills
	{
		string BillName;
		uint Bill_ID;
		string BillStatus;
		uint BillCost;
		string BillIssuedToName;
		string BillIssuedByName;
		string BillIssuedTo_ID;
		string BillIssuedBy_ID;
	}
	struct Payments
	{
		string Payment_ID;
		string Bill_ID;
		string Payment_Amount;
		string PaymentIssuedToName;
		uint PaymentIssuedTo_ID;
		string PaymentIssuedByName;
		uint PaymentIssuedBy_ID;
	}
	//Examples: Bill Dispute, Supply Delivery, Supply Repair, etc.
	struct Inquiries
	{
		uint Inquiry_ID;
		string InquirerName;
		uint Inquirer_ID;
		string InquiryAssignedToName;
		uint InquiryAssignedTo_ID;
	    string InquirerDescription;
		string InquiryStatus;
		string InquiryOpenDate;
		string InquiryCloseDate;
	}

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

	/*functions

	collectPHI
	sendPHI
	updatePHI ?
	diagnosePatient
	treatPatient
    createClaim
	updateClaim
	requestSupply
	requestSupplyRepair
	submitInquiry
	resolveInquiry


	*/
