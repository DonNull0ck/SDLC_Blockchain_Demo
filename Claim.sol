//import solidity

pragma solidity ^0.4.0; //pay attention to compiler version to avoid issues

contract Claim { 

		string ClaimName;
		string Claim_ID;
		uint Claim_TotalCost;
		uint Claim_InsuranceCost;
		uint Claim_PatientCost;
		string ClaimStatus;
		string ClaimIssuedToName;
		uint ClaimIssuedTo_ID;
		string ClaimIssuedFromName;
		uint ClaimIssuedFrom_ID;
		string ClaimIssuedToAddress;
		string ClaimIssuedFromAddress;
		string ClaimIssuedToEmailAddress;
		string ClaimIssuedFromEmailAddress;
		string ClaimIssuedToPhone;
		string ClaimIssuedFromPhone;
		
		
		struct ItemizedClaim{
		
		string ItemName;
		string Item_ID;
		string ItemServiceDate;
		uint Item_Cost;
		
		}

}