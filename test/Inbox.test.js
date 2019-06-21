const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const contracts = require('../read_compiled');

const provider = ganache.provider()
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);

const interface = contracts.interface;
const bytecode = contracts.bytecode;

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Jon was here.';

beforeEach(async () => {
  // getting a list of all accounts
  accounts = await web3.eth.getAccounts();

  // deploy contract into ganache network
  inbox = await new web3.eth.Contract(interface).deploy({
    data: bytecode,
    arguments: [INITIAL_MESSAGE]
  }).send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: '30000000000000'
  });
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message , INITIAL_MESSAGE);
  });

  it('can change the message', async function () {
    this.timeout(5000);
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message , 'bye');
  });
});