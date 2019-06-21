const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const contracts = require('./read_compiled');
const mnemonic = 'bitter wash unable original steak claim style finger body proof future jar';

const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/d5237e07e0624ae990f89dfe31d8e886');
const web3 = new Web3(provider);

const interface = contracts.interface;
const bytecode = contracts.bytecode;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(interface)
    .deploy({data: '0x' + bytecode, arguments:['This is deployed!']})
    .send({gas:'1000000', from: accounts[0]});
    console.log('Contract deployed to', result.options.address);
};
deploy();

provider.engine.stop();