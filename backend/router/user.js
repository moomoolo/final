const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserList, alterUserInfo, deleteUser, checkUser, addUser } = require('../utils/db');
const { addNewAccount } = require('../utils/ethUtils');
const Web3 = require('web3');

const userRouter = express.Router();

const checkAdmin = async (req, res, next) => {
    const authToken = req.get('Authentication');
    const token = authToken.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, rawToken) => {
        if (err) {
            res.status(401).end();
        } else {
            if (rawToken.userInfo.role_str === 'admin') {
                next();
            } else {
                res.status(401).end();
            }
        }
    })
}

userRouter.use(checkAdmin);

userRouter.get('/list', async (req, res) => {
    const userList = await getUserList();
    res.status(200).json(userList).end();
})

userRouter.post('/alter', async (req, res) => {
    const userInfo = req.body;
    try {
        const _ = await alterUserInfo(userInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).end();
    }
})

userRouter.post('/delete', async (req, res) => {
    const userInfo = req.body;
    try {
        const _ = await deleteUser(userInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).end();
    }
})

userRouter.post('/add', async (req, res) => {
    let userInfo = req.body;
    try {
        const exist = await checkUser(userInfo);
        if (exist) {
            res.status(400).json({ msg: 'ID已存在' }).end();
        } else {
            // 创建geth账户新密码
            const eth_passwd = Web3.utils.randomHex(20);
            const { address, privateKey: private_key } = await addNewAccount(eth_passwd);
            userInfo = {
                ...userInfo,
                address,
                private_key
            };
            const _ = await addUser(userInfo);
            res.status(200).end();
        }

    } catch(err) {
        res.status(400).json(err).end();
    }
})

module.exports = userRouter;