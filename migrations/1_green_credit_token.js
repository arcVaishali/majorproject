const GreenCreditToken = artifacts.require("GreenCreditToken");
const ParticipantsRegistry = artifacts.require("ParticipantsRegistry");

module.exports = async function (deployer) {
  // Deploy ParticipantsRegistry contract
  await deployer.deploy(ParticipantsRegistry);
  const participantsRegistry = await ParticipantsRegistry.deployed();
  
  // Deploy GreenCreditToken contract with the address of ParticipantsRegistry
  await deployer.deploy(GreenCreditToken, participantsRegistry.address);
};
