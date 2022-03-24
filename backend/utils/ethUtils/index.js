const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

// 导入coinbase，仅用于ganache测试
const rawKey = '0x7f878aa47a5fb3a4c5d340ece86b0e005c20aa39bd0a4b9010ab0d2d0322c545';
const coinbasePasswd = 'passwd';
let coinbaseAddr;
web3.eth.personal.importRawKey(rawKey, coinbasePasswd)
.then((addr) => { coinbaseAddr = addr });

const eth = {};

eth.addNewAccount = async (passwd) => {
    console.log(coinbaseAddr);
    const address = await web3.eth.personal.newAccount(passwd);
    // 给地址发送1eth
    const _ = await web3.eth.personal.sendTransaction({
        from: coinbaseAddr,
        to: address,
        gasPrice: "20000000000",
        gas: "21000",
        value: Web3.utils.toWei('1', 'ether'),
        data: ""
    }, coinbasePasswd);
    return address;
}



module.exports = eth;