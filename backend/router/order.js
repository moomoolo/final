const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserEthInfoById, getStationNameById } = require('../utils/db');
const { createNewOrder, getOrderDetailByHash } = require('../utils/ethUtils');
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
    const token = req.get('Authentication').split(' ')[1];
    try {
        const { id } = jwt.verify(token, jwtSecret);
        console.log(id);
        const ethInfo = await getUserEthInfoById(id);
        const tx = await createNewOrder(ethInfo.address, ethInfo.eth_passwd, orderInfo);
        const orderHash = tx.events.NewOrder.returnValues.hash;
        res.status(200).json({ orderHash }).end();
    } catch(err) {
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

module.exports = orderRouter;