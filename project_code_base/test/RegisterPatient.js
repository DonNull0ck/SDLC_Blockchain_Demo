const RegisterPatient = artifacts.require("./RegisterPatient.sol");

contract("RegisterPatient", accounts => {
  it("should register new patient using Patient struct", async () => {
    const newPatient = await RegisterPatient.deployed();

    // create new patient using setPatient
    await newPatient.setPatient("Bhim Dahal", "1234", "form_12", "123-456-1234","01/01/1100","test@gmail.com" , { from: accounts[0] });

    // Get new patient from getter getPatient
    const storedPatient = await newPatient.patientAccts.call();
    console.log(storedPatient);

   //assert.equal(storedPatient, ['Bhim Dahal', '1234', 'form_12', '123-456-1234','01/01/1100','test@gmail.com']);
  });
});
