var web3 = new Web3(Web3.givenProvider);
var voteApp;
var candsNames = [];
var candsIds = [];
var length;


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      voteApp = new web3.eth.Contract(window.abi, "0xd28454418DFB7eBc866C08C020186383840c0b7a", {from: accounts[0]});
      getLength();
    //  getCandidates();
    getCands();
    });
    $("#castVote_button").click(castVote);
    $("#approveAddressBtn").click(aprAdress);

});

function castVote(){
  var voteID = $("#id_in").val();
  var config = {
    value: web3.utils.toWei("1", "ether")
  }
  voteApp.methods.vote(voteID).send(config) //send will send data to function createPerson
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

//Hi danielle, this is where I struggle. How could I make a loop that calls an async function again and again?
//Here I want to get data from the Voters struct array candidates and push the data into a new array in javascript
/*
async function getCandidates() {
const len = length;
  for (let count = 0; count < len; count++) {
    console.log(count);
    await  voteApp.methods.candidates(count).call().then(function(res){
        candsNames.push(res.name);
        candsIds.push(count);
        console.log(candsNames[1]);
        console.log(candsIds[0]);
        $("#id_out").text(res.votes);
        $("#name_out").text(web3.utils.toAscii(res.name));
        console.log(count);

    })
  }
$("#print").text(candsNames + candsIds);
}
*/

//This is of course not the final solution, but I did hardcode it for now to have some representation of the candidates.
async function getCands(){
  console.log("running");
    await voteApp.methods.candidates(0).call().then(function(res){
    console.log(web3.utils.toAscii(res.name));
    $("#id0_out").text(0);
    $("#name0_out").text(web3.utils.toUtf8(res.name));
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

function aprAdress() {
  var adr = $("#votersAddress").val();
  var config = {
    value: web3.utils.toWei("1", "ether")
  }
  voteApp.methods.approveVoter(adr).send(config);
}

function getLength(){
  voteApp.methods.candLength().call().then(function(res){
    length = res;
    console.log(length);
  })




}
