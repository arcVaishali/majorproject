const Token = artifacts.require("Token");
const StandardToken = artifacts.require("StandardToken");
const FGCT = artifacts.require("FGCT" );

module.exports = function (deployer) {
  deployer.deploy(Token, 18000000000 );
  deployer.deploy(StandardToken, 18000000);
  deployer.deploy(FGCT, 180000);
};
