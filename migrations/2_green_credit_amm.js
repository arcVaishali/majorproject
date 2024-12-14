const GreenCreditAMM = artifacts.require("GreenCreditAMM");

module.exports = function (deployer) {
  deployer.deploy(GreenCreditAMM , "0x81eCBE42c7Bc352Ece8857eC7173f24D4cCbF3E6");
};
