const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserList, alterUserInfo } = require('../utils/db');

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
    console.log(userInfo);
    try {
        const _ = await alterUserInfo(userInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).end();
    }
})

module.exports = userRouter;