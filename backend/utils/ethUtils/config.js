const config = {};

config.contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "NewOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "res",
				"type": "uint256"
			}
		],
		"name": "TestEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "fromStation",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "toStation",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "fromAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "toAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderPhone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recieverName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recieverPhone",
				"type": "string"
			}
		],
		"name": "createOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "getOrderInfoByHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "fromStation",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "toStation",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "fromAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "toAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderPhone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recieverName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recieverPhone",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "createTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

config.contractAddr = '0x948D2A73deAc3F6A3783ec3e161E820f159feADe';

module.exports = config;