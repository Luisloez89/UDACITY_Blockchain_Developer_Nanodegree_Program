const StarNotary = artifacts.require("StarNotary");

module.exports = function(deployer) {
  deployer.deploy(StarNotary, "Crypto Star Token", "CST");
};
