const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const eth = {};

eth.addNewAccount = async (passwd) => {
    console.log('adding account');
    const address = await web3.eth.personal.newAccount(passwd);
    console.log(address);
    return address;
}

module.exports = eth;