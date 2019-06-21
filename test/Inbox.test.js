const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const provider = ganache.provider()
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);

// reading JSON file contents
let jsonOutputName = path.parse('Inbox').name + '.json';
let jsonFile = './build/' + jsonOutputName;
let contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
let jsonOutput = JSON.parse(contractJsonContent);

// retrieving contract info
let interface = jsonOutput['abi'];
let bytecode = jsonOutput['evm']['bytecode']['object'];

let accounts;
let inbox;

beforeEach(async function () {
  // getting a list of all accounts
  accounts = await web3.eth.getAccounts();

  // deploy contract into ganache network
  inbox = await new web3.eth.Contract(interface).deploy({
    data: bytecode,
    arguments: ['My String']
  }).send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: '30000000000000'
  });
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});