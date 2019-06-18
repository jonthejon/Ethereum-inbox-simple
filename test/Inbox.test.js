const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const web3 = new Web3(ganache.provider());

let accounts;
let abi;
let data;

beforeEach(async () => {

  // reading JSON file contents
  let jsonOutputName = path.parse('Inbox').name + '.json';
  let jsonFile = './build/' + jsonOutputName;
  let contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
  let jsonOutput = JSON.parse(contractJsonContent);

  // retrieving contract info
  abi = jsonOutput['abi'];
  data = jsonOutput['evm']['bytecode']['object'];

  // get a list of all accounts
  // accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy the contract
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(accounts);
    // console.log(abi);
    console.log(data);
  });
});
