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
				"name": "receiverName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "receiverPhone",
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
			},
			{
				"internalType": "bytes32",
				"name": "station",
				"type": "bytes32"
			}
		],
		"name": "deliverOrder",
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
			},
			{
				"internalType": "bytes32",
				"name": "station",
				"type": "bytes32"
			}
		],
		"name": "endOrder",
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
		"name": "getOrderActionList",
		"outputs": [
			{
				"internalType": "enum ActionType[]",
				"name": "",
				"type": "uint8[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
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
				"name": "receiverName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "receiverPhone",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "createTime",
				"type": "uint256"
			},
			{
				"internalType": "enum OrderStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "curStation",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "station",
				"type": "bytes32"
			}
		],
		"name": "getStationOrderHashList",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "station",
				"type": "bytes32"
			}
		],
		"name": "receiveOrder",
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
			},
			{
				"internalType": "bytes32",
				"name": "toStation",
				"type": "bytes32"
			}
		],
		"name": "sendOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

config.contractAddr = '0xA952D367F7789bd630b0Ffe108f181a717EA972c';

module.exports = config;