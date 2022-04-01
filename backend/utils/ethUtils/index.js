const Web3 = require('web3');
const config = require('./config');

const web3 = new Web3('http://localhost:8545');


// 导入coinbase，仅用于ganache测试
const rawKey = '0x7f878aa47a5fb3a4c5d340ece86b0e005c20aa39bd0a4b9010ab0d2d0322c545';
const coinbasePasswd = 'passwd';
let coinbaseAddr;
web3.eth.personal.importRawKey(rawKey, coinbasePasswd)
.then((addr) => { coinbaseAddr = addr });

// 导入合约

const contract = new web3.eth.Contract(config.contractAbi, config.contractAddr);

const eth = {};

eth.addNewAccount = async (passwd) => {
    const res = await web3.eth.accounts.create();
    // 给地址发送1eth
    const _ = await web3.eth.personal.sendTransaction({
        from: coinbaseAddr,
        to: res.address,
        gasPrice: "20000000000",
        gas: "21000",
        value: Web3.utils.toWei('1', 'ether'),
        data: ""
    }, coinbasePasswd);
    return res;
}

eth.createNewOrder = async (fromAddr, privateKey, {
    fromStation,
    toStation,
    fromAddress,
    toAddress,
    senderName,
    senderPhone,
    recieverName,
    recieverPhone,
}) => {
    let _ = await web3.eth.personal.importRawKey(privateKey, 'passwd');
    _ = await web3.eth.personal.unlockAccount(fromAddr, 'passwd');
    return await contract.methods.createOrder(
        fromStation,
        toStation,
        fromAddress,
        toAddress,
        senderName,
        senderPhone,
        recieverName,
        recieverPhone,
    ).send({ 
        from: fromAddr,
        gas: '3000000',
        gasPrice: '2000000',
    });
}

const formalizeOrder = (order) => {
    let date = new Date(order.createTime * 1000);
    order.createTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

eth.getOrderDetailByHash = async (hash) => {
    const res = await contract.methods.getOrderInfoByHash(hash).call({ from: coinbaseAddr });
    formalizeOrder(res);
    return res;
}

eth.getStationOrderToReceive = async (station) => {
    const res = await contract.methods.getStationOrderHashList(station).call({ from: coinbaseAddr });
    const orderList = await Promise.all(res.map((hash) => {
        return eth.getOrderDetailByHash(hash);
    }));
    for (let i = 0; i < res.length; i++) {
        orderList[i].hash = res[i];
    }
    const orderToReceive = orderList.filter((item) => {
        return item.status === '1';
    })
    return orderToReceive;
}

eth.getStationOrderToSend = async (station) => {
    const res = await contract.methods.getStationOrderHashList(station).call({ from: coinbaseAddr });
    const orderList = await Promise.all(res.map((hash) => {
        return eth.getOrderDetailByHash(hash);
    }))
    for (let i = 0; i < res.length; i++) {
        orderList[i].hash = res[i];
    }
    const orderToSend = orderList.filter((item) => {
        return item.status === '0';
    })
    return orderToSend;
}

eth.getStationOrderToDeliver = async (station) => {
    const res = await contract.methods.getStationOrderHashList(station).call({ from: coinbaseAddr });
    const orderList = await Promise.all(res.map((hash) => {
        return eth.getOrderDetailByHash(hash);
    }))
    for (let i = 0; i < res.length; i++) {
        orderList[i].hash = res[i];
    }
    const orderToDeliver = orderList.filter((item) => {
        return item.status === '2';
    })
    return orderToDeliver;
}

eth.getStationOrderToEnd = async (station) => {
    const res = await contract.methods.getStationOrderHashList(station).call({ from: coinbaseAddr });
    const orderList = await Promise.all(res.map((hash) => {
        return eth.getOrderDetailByHash(hash);
    }))
    for (let i = 0; i < res.length; i++) {
        orderList[i].hash = res[i];
    }
    console.log(orderList);
    const orderToEnd = orderList.filter((item) => {
        return item.status === '3';
    })
    console.log(orderToEnd);
    return orderToEnd;
}

eth.getOrderActionsByHash = async (hash) => {
    const res = await contract.methods.getOrderActionList(hash).call({ from: coinbaseAddr });
    const actionList = [];
    actionMap = {
        '0': 'START',
        '1': 'RECEIVE',
        '2': 'SEND',
        '3': 'END',
    }
    for (let i = 0; i  < res[0].length; i++) {
        actionList.push({
            action: actionMap[res[0][i]],
            fromStation: res[1][i],
            toStation: res[2][i],
            operator: res[3][i],
            time: res[4][i]
        });
    }
    return actionList;
}

eth.sendOrder = async (addr, privateKey, hash, toStation) => {
    let _ = await web3.eth.personal.importRawKey(privateKey, 'passwd');
    _ = await web3.eth.personal.unlockAccount(addr, 'passwd');
    const res = await contract.methods.sendOrder(hash, toStation).send({
        from: addr,
        gasPrice: "20000000000",
        gas: "3000000",
    });
    return true;
}

eth.receiveOrder = async (addr, privateKey, hash, station) => {
    let _ = await web3.eth.personal.importRawKey(privateKey, 'passwd');
    _ = await web3.eth.personal.unlockAccount(addr, 'passwd');
    const res = await contract.methods.receiveOrder(hash, station).send({
        from: addr,
        gasPrice: "20000000000",
        gas: "3000000",
    });
    return true;
}

eth.deliverOrder = async (addr, privateKey, hash) => {
    let _ = await web3.eth.personal.importRawKey(privateKey, 'passwd');
    _ = await web3.eth.personal.unlockAccount(addr, 'passwd');
    const res = await contract.methods.deliverOrder(hash).send({
        from: addr,
        gasPrice: "20000000000",
        gas: "3000000",
    });
    return true;
}

eth.endOrder = async (addr, privateKey, hash, station) => {
    let _ = await web3.eth.personal.importRawKey(privateKey, 'passwd');
    _ = await web3.eth.personal.unlockAccount(addr, 'passwd');
    const res = await contract.methods.endOrder(hash, station).send({
        from: addr,
        gasPrice: "20000000000",
        gas: "3000000",
    });
    return true;
}

module.exports = eth;