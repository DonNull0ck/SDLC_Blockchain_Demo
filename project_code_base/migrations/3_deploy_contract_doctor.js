const Doctors = artifacts.require("Doctors");

module.exports = function(deployer) {
  deployer.deploy(Doctors);
};
