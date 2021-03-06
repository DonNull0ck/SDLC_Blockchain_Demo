//import solidity

pragma solidity >=0.4.2 <0.6.0;
//pay attention to compiler version to avoid issues

//generalized class/contract, could be a pharmacist, office manager, medical equipment tech, etc.
contract SupPro {

	string SupProName;
	uint SupPro_ID;
	uint Patient_ID;
	string PatientName;
	string SupProSSN;
	string SupProDateOfBirth;
	uint SupProAge;
	string SupProFullAddress;
	string SupProEmailAddress;
	string SupProPhone;
	string SupProEmployer;
	string SupProInsurancePlan;
	uint PatientInsuranceGroupNumber;
	address SupProPaymentAddress;

	struct Supplies
	{
		string SupplyName;
		string SupplyID;
		uint SupplyCost;
		string[] SupplyRelatedTreatments;
		string[] SupplyRelatedTreatments_ID;
		bool SupplyFunctional;
	}

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
		string BillStatus;
		uint BillCost;
		string BillIssuedToName;
		string BillIssuedByName;
		string BillIssuedTo_ID;
		uint BillIssuedBy_ID;
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
	viewSupplies
	addSupplies
	repairSupplies
	deliverSupplies
	processPayment
	submitPayment
	resolveInquiry

	*/

}
