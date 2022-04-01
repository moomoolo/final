const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserEthInfoById, getStationNameById } = require('../utils/db');
const { createNewOrder, getOrderDetailByHash, getStationOrderToReceive, getStationOrderToSend, sendOrder, receiveOrder, getStationOrderToDeliver, getStationOrderToEnd, deliverOrder, endOrder } = require('../utils/ethUtils');
const orderRouter = express.Router();

const checkPostman = async (req, res, next) => {
    const authToken = req.get('Authentication');
    const token = authToken.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, rawToken) => {
        if (err) {
            res.status(401).end();
        } else {
            if (rawToken.userInfo.role_str === 'postman') {
                next();
            } else {
                res.status(401).end();
            }
        }
    })
}

orderRouter.post('/new',
checkPostman,
async (req, res) => {
    const orderInfo = req.body;
    try {
        const token = req.get('Authentication').split(' ')[1];
        const { id } = jwt.verify(token, jwtSecret);
        console.log(id);
        const ethInfo = await getUserEthInfoById(id);
        const tx = await createNewOrder(ethInfo.address, ethInfo.private_key, orderInfo);
        console.log(tx);
        const orderHash = tx.events.NewOrder.returnValues.hash;
        res.status(200).json({ orderHash }).end();
    } catch(err) {
        console.log(err);
        res.status(400).json(err).end();
    }
})

orderRouter.get('/detail/:hash', async (req, res) => {
    const hash = req.params.hash;
    try {
        const orderDetail = await getOrderDetailByHash(hash);
        // 转换站点列表
        orderDetail.fromStationStr = await getStationNameById(orderDetail.fromStation);
        orderDetail.toStationStr = await getStationNameById(orderDetail.toStation);
        res.status(200).json(orderDetail).end();
    } catch(err) {
        console.log(err);
        res.status(400).json(err).end();
    }
})

orderRouter.get('/receive/:station',
checkPostman,
async (req, res) => {
    try{
        const station = req.params.station;
        const list = await getStationOrderToReceive(station);
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

orderRouter.get('/send/:station',
checkPostman,
async (req, res) => {
    try {
        const station = req.params.station;
        const list = await getStationOrderToSend(station);
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})


orderRouter.get('/deliver/:station',
checkPostman,
async (req, res) => {
    try {
        const station = req.params.station;
        const list = await getStationOrderToDeliver(station);
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

orderRouter.get('/end/:station',
checkPostman,
async (req, res) => {
    try {
        const station = req.params.station;
        console.log('end');
        const list = await getStationOrderToEnd(station);
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})


orderRouter.post('/send',
checkPostman,
async (req, res) => {
    const info = req.body;
    try {
        const token = req.get('Authentication').split(' ')[1];
        const { id } = jwt.verify(token, jwtSecret);
        const { address, private_key } = await getUserEthInfoById(id);
        const { hash, toStation } = info;
        let _ = await sendOrder(address, private_key, hash, toStation);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

orderRouter.post('/receive',
checkPostman,
async (req, res) => {
    const info = req.body;
    try {
        const token = req.get('Authentication').split(' ')[1];
        const { id } = jwt.verify(token, jwtSecret);
        const { address, private_key } = await getUserEthInfoById(id);
        const { hash, station } = info;
        let _ = await receiveOrder(address, private_key, hash, station);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

// 派送
orderRouter.post('/deliver',
checkPostman,
async (req, res) => {
    const info = req.body;
    try {
        const token = req.get('Authentication').split(' ')[1];
        const { id } = jwt.verify(token, jwtSecret);
        const { address, private_key } = await getUserEthInfoById(id);
        const { hash, station } = info;
        let _ = await deliverOrder(address, private_key, hash);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

// 结束
orderRouter.post('/end',
checkPostman,
async (req, res) => {
    const info = req.body;
    try {
        const token = req.get('Authentication').split(' ')[1];
        const { id } = jwt.verify(token, jwtSecret);
        const { address, private_key } = await getUserEthInfoById(id);
        const { hash, station } = info;
        let _ = await endOrder(address, private_key, hash, station);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

module.exports = orderRouter;