//import solidity

pragma solidity ^0.4.0; //pay attention to compiler version to avoid issues

//generalized class/contract, could be a doctor, nurse, surgeon, etc. 
contract MedPro { 

	string Name;
	uint MedPro_ID;
	string SSN;
	string DateOfBirth;
	uint Age;
	string FullAddress;
	string EmailAddress;
	string Phone;
	string Employer;
	string[] InsurancePlansAccepted;
	string[] InsurancePlansInNetwork;
	string[] MedicalSupplies;
	uint TreatmentsPerformedTotal;
	uint TreatmentCostAvg;
	uint TreatmentCostMax;
	uint TreatmentCostMin;
	string PatientFormID; 
	
	//Examples: Exam, Surgery, Prescription, etc. 
	struct Treatments {
		string TreatmentName;
		string TreatmentID;
		string TreatmentSuppliesNeeded[];
		string TreatmentSupplyID[];
		uint TreatmentCost;
	}
	//Examples: MRI machine, Antibiotics, Scalpel
	struct Supplies 
	{
		string SupplyName;
		string SupplyID;
		uint SupplyCost;
		string SupplyRelatedTreatments[];
		string SupplyRelatedTreatmentIDs[];
		string SupplyStatusScapel
	}
	struct Claims
	{
		string ClaimName;
		string Claim_ID;
		bool ClaimStatus;
		uint ClaimCostPatient;
		uint ClaimCostInsurance;
	}
	struct Bills 
	{
		string BillName;
		string Bill_ID;
		string BillStatus;
		uint BillCost;
		string BillIssuedTo;
		string BillIssuedBy; 
	}
	struct Payments 
	{
		string Payment_ID;
		string Bill_ID;
		string Payment_Amount;
		string PaymentIssuedTo;
		string PaymentIssuedBy;	
	}
	//Examples: Bill Dispute, Supply Delivery, Supply Repair, etc. 
	struct Inquiries 
	{
		string Inquiry_ID;
		string InquirerName;
		string InquirerID;
		string InquiryAssignedToName;
		string  InquiryAssignedToID;
	    string InquirerDescription;
		string InquiryStatus;
		string InquiryOpenDate;
		string InquiryCloseDate;
	}