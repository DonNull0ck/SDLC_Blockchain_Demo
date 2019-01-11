//import solidity

pragma solidity ^0.4.0; //pay attention to compiler version to avoid issues

//generalized class/contract, could be a payment specialist, customer support rep, data analyst, etc. 
contract PayPro { 

	string Name;
	uint PayPro_ID;
	string SSN;
	string DateOfBirth;
	uint Age;
	string FullAddress;
	string EmailAddress;
	string Phone;
	string Employer;
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
	struct Inquiries 
	{
		string Inquiry_ID;
		string InquirerName;
		string InquirerID;
		string InquiryAssignedToName;
		string InquiryAssignedToID;
	    string InquirerDescription;
		string InquiryStatus;
		string InquiryOpenDate;
		string InquiryCloseDate;
	}
	
	/* functions
	
	sendPHI
	receivePHI
	submitClaim
	processClaim
	editClaim
	processPayment
	editPayment
	submitPayment
	resolveInquiry

	
	*/
	
}
