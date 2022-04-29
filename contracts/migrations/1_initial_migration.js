const Migrations = artifacts.require("Migrations");
const BlockChainDNS = artifacts.require("BlockchainDNS")

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(BlockChainDNS)
};
