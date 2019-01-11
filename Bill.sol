//import solidity

pragma solidity ^0.4.0; //pay attention to compiler version to avoid issues

contract Bill { 

		string BillName;
		string Bill_ID;
		uint Bill_TotalCost;
		uint Bill_InsuranceCost;
		uint Bill_PatientCost;
		string BillStatus;
		string BillIssuedToName;
		uint BillIssuedTo_ID;
		string BillIssuedFromName;
		uint BillIssuedFrom_ID;
		string BillIssuedToAddress;
		string BillIssuedFromAddress;
		string BillIssuedToEmailAddress;
		string BillIssuedFromEmailAddress;
		string BillIssuedToPhone;
		string BillIssuedFromPhone;

		
		struct ItemizedBill{
		
		string ItemName;
		string Item_ID;
		string ItemServiceDate;
		uint Item_Cost;
		
		}

}