const Doctor = artifacts.require("Doctors");

contract("Doctors", accounts => {
  it("should intialize doctor with two accounts", async () => {
    const _doctor = await Doctor.deployed();
    const doctorCounts = await _doctor.doctorsCount.call();
    assert.equal(doctorCounts,2);
  });
});
