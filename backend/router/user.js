const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserList } = require('../utils/db');

const userRouter = express.Router();

const checkAdmin = async (req, res, next) => {
    const authToken = req.get('Authentication');
    const token = authToken.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, rawToken) => {
        if (err) {
            res.status(401).end();
        } else {
            console.log(rawToken);
            if (rawToken.userInfo.roleStr === 'admin') {
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

module.exports = userRouter;