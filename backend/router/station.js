const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const { getStationList, addNewStation, alterStation,deleteStation } = require('../utils/db');

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

const checkAdminOrPostman = async (req, res, next) => {
    const authToken = req.get('Authentication');
    const token = authToken.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, rawToken) => {
        if (err) {
            res.status(401).end();
        } else {
            if (rawToken.userInfo.role_str === 'admin' || rawToken.userInfo.role_str === 'postman') {
                next();
            } else {
                res.status(401).end();
            }
        }
    })
}

stationRouter.get('/list', checkAdminOrPostman, async (req, res) => {
    try {
        const list = await getStationList();
        res.status(200).json(list).end();
    } catch(err) {
        res.status(400).end();
    }
})


stationRouter.post('/add', checkAdmin,async (req, res) => {
    const stationInfo = req.body;
    try {
        const _ = await addNewStation(stationInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

stationRouter.post('/alter', checkAdmin,async (req, res) => {
    const stationInfo = req.body;
    console.log(stationInfo);
    try {
        const _  = await alterStation(stationInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

stationRouter.post('/delete', checkAdmin,async (req, res) => {
    const stationInfo = req.body;
    try {
        const _ = await deleteStation(stationInfo);
        res.status(200).end();
    } catch(err) {
        res.status(400).json(err).end();
    }
})

module.exports = stationRouter;