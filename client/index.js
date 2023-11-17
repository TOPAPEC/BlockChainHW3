const { Web3 } = require('web3');
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "addStruct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "removeStruct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "StructureAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "StructureRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xd32d0ea38e93d9122b891aaae3a9cb4a590f36cf';
const web3 = new Web3('https://sepolia.infura.io/v3/---');
const myContract = new web3.eth.Contract(contractABI, contractAddress);
async function addStructure(id, name, content, isActive, userAddress, fromAddress, privateKey) {
    const transaction = myContract.methods.addStruct(id, name, content, isActive, userAddress);

    const options = {
        to: contractAddress,
        from: fromAddress,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({from: fromAddress}),
        gasPrice: await web3.eth.getGasPrice() // or specify your own
    };

    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const response = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction:', response);
}

async function removeStructure(id, fromAddress, privateKey) {
    const transaction = myContract.methods.removeStruct(id);

    const options = {
        to: transaction._parent._address,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({from: fromAddress}),
        gasPrice: await web3.eth.getGasPrice()
    };

    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const response = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction:', response);
}

async function getMappingData(id) {
    const data = await myContract.methods.myMapping(id).call();
    console.log(data);
}

const testid = 1;
const testName = 'NAME';
const testContent = 'Yeeeyi';
const isActive = true;
const userAddress = '0x0CDd60c1a90633875c77eFA82A8CcC665152F23a';
const fromAddress = '0x0CDd60c1a90633875c77eFA82A8CcC665152F23a';
const privateKey = '---';


// addStructure(testid, testName, testContent, isActive, userAddress, fromAddress, privateKey);
// removeStructure(testid, fromAddress, privateKey);
getMappingData(testid);