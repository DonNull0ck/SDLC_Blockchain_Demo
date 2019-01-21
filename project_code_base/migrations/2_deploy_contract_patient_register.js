const RegisterPatient = artifacts.require("./RegisterPatient.sol");

module.exports = function(deployer) {
  deployer.deploy(RegisterPatient);
};
