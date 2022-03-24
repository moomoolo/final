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
    "internalType": "uint256",
    "name": "fromStation",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "toStation",
    "type": "uint256"
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
    "internalType": "string",
    "name": "phone",
    "type": "string"
   }
  ],
  "name": "getOrderOtherInfoListByPhone",
  "outputs": [
   {
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
   },
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
    "internalType": "string",
    "name": "phone",
    "type": "string"
   }
  ],
  "name": "getOrderPeopleInfoListByPhone",
  "outputs": [
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   },
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   },
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   },
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "phone",
    "type": "string"
   }
  ],
  "name": "getOrderStationInfoListByPhone",
  "outputs": [
   {
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
   },
   {
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
   },
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   },
   {
    "internalType": "string[]",
    "name": "",
    "type": "string[]"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 }
]

config.contractAddr = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';

module.exports = config;