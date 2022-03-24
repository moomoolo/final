const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');
(async () => {
let _;
const rawKeyStr = '0x7f878aa47a5fb3a4c5d340ece86b0e005c20aa39bd0a4b9010ab0d2d0322c545';
const defaultAddr = '0xBffD1CDB505cfBBdFb9718Cf1E9E962CDB668D53';

// 导入用户
const passwd = 'passwd';
_ = await web3.eth.personal.importRawKey(rawKeyStr, passwd);

const contractAbi = [
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

const contractAddress = '0xe44dA380259B683381ca6c5EBd70101747a9a5C8';

const transportContract = new web3.eth.Contract(
    contractAbi,
    contractAddress,
    {
        from: defaultAddr,
        gasPrice: '20000000000',
    }
)

const parameter = {
    fromStation: "0x20655970faf84433c3054ce6028b5e88c14cf7cb0e34c5445b586e16701eb96d",
    toStation: "0x8cf45e99bb638b9a027f7edf238592ad811c1467f0b90203df73f0291f2b6d9f",
    fromAddress: "武汉大学",
    toAddress: "深圳大学",
    senderName: "木木",
    senderPhone: "15566778899",
    recieverName: "林林",
    recieverPhone: "14455667788"
}

// transportContract.methods.createOrder(
//     "0x20655970faf84433c3054ce6028b5e88c14cf7cb0e34c5445b586e16701eb96d",
//     "0x8cf45e99bb638b9a027f7edf238592ad811c1467f0b90203df73f0291f2b6d9f",
//     "武汉大学",
//     "深圳大学",
//     "木木",
//     "15566778899",
//     "林林",
//     "14455667788"
// ).send({
//     from: defaultAddr,
//     gasPrice: '20000000000',
//     gas: '3000000',
// }).on('transactionHash', (arg1, arg2) => {
//     console.log(arg1, arg2);
// })

const res = await transportContract.methods.getOrderStationInfoListByPhone("15566778899").call({
    from: defaultAddr
});
console.log(res);
})();