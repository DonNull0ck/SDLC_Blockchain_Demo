//import solidity

pragma solidity >=0.4.2 <0.6.0;
 //pay attention to compiler version to avoid issues

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
	address PaymentAddress;

	struct Claims
	{
		string ClaimName;
		string Claim_ID;
		bool ClaimSubmitted;
		bool ClaimConfirmed;
		uint ClaimCostPatient;
		uint ClaimCostInsurance;
	}
	struct Bills
	{
		string BillName;
		string Bill_ID;
		bool BillPaid;
		uint BillCost;
		string BillIssuedToName;
		string BillIssuedByName;
		uint BillIssuedTo_ID;
		uint BillIssuedBy_ID;
	}
	struct Payments
	{
		string Payment_ID;
		string Bill_ID;
		string Payment_Amount;
		string PaymentIssuedToName;
		string PaymentIssuedByName;
		uint PaymentIssuedTo_ID;
		uint PaymentIssuedBy_ID;
	}
	struct Inquiries
	{
		uint Inquiry_ID;
		string InquirerName;
		uint Inquirer_ID;
		string InquiryAssignedToName;
		uint InquiryAssignedTo_ID;
	    string InquirerDescription;
		bool InquiryOpen;
		bool InquiryClosed;
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
