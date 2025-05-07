const ParticipantsRegistry = artifacts.require("ParticipantsRegistry");

module.exports = function (deployer) {
  deployer.deploy(ParticipantsRegistry);
};
