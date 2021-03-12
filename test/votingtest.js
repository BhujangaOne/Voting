const Voting = artifacts.require("Voting");

const truffleAssert = require('truffle-assertions');

contract("Voting", accounts => {

  it("should allow voteMaster(owner) to approve voter", async () => {
    let voting = await Voting.deployed();
    await truffleAssert.passes(
      voting.approveVoter(accounts[1])
    )
    await truffleAssert.passes(
      voting.approveVoter(accounts[2])
    )
    await truffleAssert.passes(
      voting.approveVoter(accounts[3])
    )
    await truffleAssert.passes(
      voting.approveVoter(accounts[4])
    )

  })
  it("should not allow normal user to approve voter", async () => {
    let voting = await Voting.deployed();
    await truffleAssert.reverts(
      voting.approveVoter(accounts[2], {from: accounts[1]})
    )
  })
  it("should allow approved voter to vote", async () => {
    let voting = await Voting.deployed();
    await truffleAssert.passes(
      voting.vote(0, {from: accounts[1]})
    )
  })
  it("should not allow unapproved voter to vote", async () => {
    let voting = await Voting.deployed();
    await truffleAssert.reverts(
      voting.vote(0, {from: accounts[5]})
    )
  })
  it("should allow approved voter to delegate his/her vote to someone", async() => {
    let voting = await Voting.deployed();
    await truffleAssert.passes(
    voting.delegateVote(accounts[3], {from: accounts[2]})
    )
  })
  it("should not allow unapproved voter to delegate his/her vote to someone", async() => {
    let voting = await Voting.deployed();
    await truffleAssert.reverts(
    voting.delegateVote(accounts[3], {from: accounts[5]})
    )
  })




})
