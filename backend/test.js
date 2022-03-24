const Web3 = require('web3');
const config = require('./utils/ethUtils/config');

const web3 = new Web3('http://localhost:8545');

(async () => {
let _;
const rawKeyStr = '0x7f878aa47a5fb3a4c5d340ece86b0e005c20aa39bd0a4b9010ab0d2d0322c545';
const defaultAddr = '0xBffD1CDB505cfBBdFb9718Cf1E9E962CDB668D53';
const testAddr = '0xd364e0c9F3f51D8b5b44864151C612347179749e';
const testPasswd = '0xfe9bb2b676c7479a42c84b4cbb64b2ce9a392928';
// 导入用户
const passwd = 'passwd';
_ = await web3.eth.personal.importRawKey(rawKeyStr, passwd);


const transportContract = new web3.eth.Contract(
    config.contractAbi,
    config.contractAddr,
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

const method = transportContract.methods.createOrder(
    "0x20655970faf84433c3054ce6028b5e88c14cf7cb0e34c5445b586e16701eb96d",
    "0x8cf45e99bb638b9a027f7edf238592ad811c1467f0b90203df73f0291f2b6d9f",
    "武汉大学",
    "深圳大学",
    "木木",
    "15566778899",
    "林林",
    "14455667788"
)

web3.eth.getAccounts()
.then((list) => {
    console.log(list);
})

web3.eth.personal.unlockAccount(testAddr, testPasswd)
.then(() => {
    method.send({ from: testAddr })
    .then((data) => {
        console.log(data);
    });
})


// .send({
//     from: testAddr
// }, testPasswd).on('transactionHash', (arg1, arg2) => {
//     console.log(arg1, arg2);
// }).on('receipt', (receipt) => {
//     console.log('receipt', receipt);
// }).on('confirmation', (confirm) => {
//     console.log('confirm', confirm);
// })

// const res = await transportContract.methods.getOrderStationInfoListByPhone("15566778899").call({
//     from: defaultAddr
// });
// console.log(res);
})();