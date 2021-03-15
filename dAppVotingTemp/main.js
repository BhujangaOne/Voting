var web3 = new Web3(Web3.givenProvider);
var voteApp;
var candsNames = [];
var candsIds = [];
var length;


$(document).ready(function() {
      window.ethereum.enable().then(function(accounts){
      voteApp = new web3.eth.Contract(window.abi, "0x3F0431B4D908339285A421FEEcEBbeA8601bB022", {from: accounts[0]});
    getAllCands();
    //getCands();
    });
    $("#castVote_button").click(castVote);
    $("#approveAddressBtn").click(aprAdress);

});

async function castVote(){
  var voteID = $("#id_in").val();
  var config = {
    value: web3.utils.toWei("1", "ether")
  }
await voteApp.methods.vote(voteID).send(config) //send will send data to function createPerson
    .on("transactionHash", function(hash){ //event listener that listens for transactionHash
      console.log("tx hash");
    })
    .on("confirmation", function(confirmationNumber, receipt){ //listener for confirmationNumber only works on real blockchain as local will not confirm for real
        console.log("conf");
    })
    .on("receipt", function(receipt){
      console.log(receipt);
    })
  }

async function getAllCands() {
  const candsLength = await voteApp.methods.candLength().call();
  for (let i = 0; i < candsLength; i++){
    candsNames.push(
    await voteApp.methods.candidates(i).call().then(result => {
        return [result[0]];
      })
    )
    candsIds.push(i);

  }
  $("#name0_out").text(web3.utils.toUtf8(candsNames[1].toString()));
  printCands();
  console.log(candsNames);
  console.log(candsIds);
}

async function printCands(){
  const candsLength = await voteApp.methods.candLength().call();
  for (var i = 0; i < candsLength; i++){
    $('<div class="candsOut" />').text("ID: " + candsIds[i] + ": " + web3.utils.toUtf8(candsNames[i].toString())).appendTo('.CandsOut');
  }
}
/*
async function getCands(candsNames){
  console.log("running");
    await voteApp.methods.candidates(0).call().then(function(res){
      console.log(web3.utils.toAscii(res.name));
      $("#id1_out").text(0);
      $("#name1_out").text(web3.utils.toUtf8(res.name));
    })
  await voteApp.methods.candidates(1).call().then(function(res){
    console.log(web3.utils.toAscii(res.name));
    $("#id1_out").text(1);
    $("#name1_out").text(web3.utils.toUtf8(res.name));
  })
  await voteApp.methods.candidates(2).call().then(function(res){
    console.log(web3.utils.toAscii(res.name));
    $("#id2_out").text(2);
    $("#name2_out").text(web3.utils.toUtf8(res.name));
  })
  await voteApp.methods.candidates(3).call().then(function(res){
    console.log(web3.utils.toAscii(res.name));
    $("#id3_out").text(3);
    $("#name3_out").text(web3.utils.toUtf8(res.name));
  })
}
*/
async function aprAdress() {
  var str = await web3.utils.toChecksumAddress($("#votersAddress").val());


  var config = {
    value: web3.utils.toWei("1", "ether")
  }
  await voteApp.methods.approveVoter(str).send(config);
}
