const Doctor = artifacts.require("Doctors");



contract("Doctors", accounts => {
  it("should intialize doctor with 1 account", async () => {
    const _doctor = await Doctor.deployed();
    const doctorCounts = await _doctor.doctorsCount.call();
    assert.equal(doctorCounts,1);
  });
  // it("should get doctor's zip as 12345", async () => {
  //   const _doctor = await Doctor.deployed();
  //   const doctor = await _doctor.doctors(1);
  //   console.log(doctor[6]);
  //   assert.equal(doctor[6],"12345");
  // });
  it("should add date and time", async () => {
    const _doctors = await Doctor.deployed();
    const _doctor = await _doctors.doctors.call(1); 
    //const _web3 = await web3;
    console.log("doctor: " + _doctor);

    let _times = [{free: true, time:"9:00 am"}, {free:true, time:"10:00 am"}];
    let _timesJSON = JSON.stringify(_times);
    console.log("time json: " + _timesJSON);
    console.log("util: " + web3);
    let _timesBytes32 = await web3.utils['toAscii'].call(_timesJSON);
    let _dates =  "02/21/2019";
    const result = await _doctors.addDate(1, _dates,_timesBytes32,{ from: accounts[0]});
    assert.equal(_doctor[6],"12345");
  });
});
