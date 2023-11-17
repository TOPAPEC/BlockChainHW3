const { Web3 } = require('web3');
// В итоге я все это написал в индексе)
const infuraUrl = 'https://sepolia.infura.io/v3/---';
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

module.exports = web3;
