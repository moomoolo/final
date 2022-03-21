const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const { getStationList } = require('../utils/db');

const stationRouter = express.Router();

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

stationRouter.use(checkAdmin);

stationRouter.get('/list', async (req, res) => {
    try {
        const list = awati getStationList();
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).end();
    }
})

module.exports = stationRouter;