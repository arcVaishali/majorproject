const GreenCreditToken = artifacts.require("GreenCreditToken");

module.exports = function (deployer) {
  deployer.deploy(GreenCreditToken);
};
