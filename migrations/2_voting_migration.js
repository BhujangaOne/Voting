const Voting = artifacts.require("Voting");
const cands = ["Tom", "Birgit", "Hans", "Karin"];

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Voting, [web3.utils.fromAscii(cands[0]),web3.utils.fromAscii(cands[1]),web3.utils.fromAscii(cands[2]),web3.utils.fromAscii(cands[3])])  ;
};
