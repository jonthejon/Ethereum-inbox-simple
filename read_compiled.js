const fs = require('fs');
const path = require('path');

// reading JSON file contents
const jsonOutputName = path.parse('Inbox').name + '.json';
const jsonFile = './build/' + jsonOutputName;
const contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
const jsonOutput = JSON.parse(contractJsonContent);

// retrieving contract info
const abi = jsonOutput['abi'];
const bytecode = jsonOutput['evm']['bytecode']['object'];

// exporting the variables to se can access on other files
exports.interface = abi;
exports.bytecode = bytecode;