const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');

const { validateUser, getUserInfoById } = require('../utils/db');
const { jwtSecret } = require('../config');

loginRouter.post('/', async (req, res) => {
    const { id, passwd } = req.body;
    const valid = await validateUser(id, passwd);
    if (valid) {
        const userInfo = await getUserInfoById(id);
        const jwtToken = jwt.sign(
            { id, userInfo },
            jwtSecret,
            { expiresIn: Date.now() +  24 * 360000 }
        );
        res
        .status(200)
        .json({
            userInfo,
            jwtToken
        })
        .end();
        
    } else {
        res
        .status(401)
        .json('access denied')
        .end();
    }
})

loginRouter.get('/validate', async (req, res) => {
    const authToken = req.get('Authentication');
    console.log(authToken);
    if (authToken) {
        const token = authToken.split(' ')[1];
        jwt.verify(token, jwtSecret, async (err, rawToken) => {
            if (err) {
                console.log('wrong');
                res.status(401).end();
            } else if (Date.now() < new Date(rawToken.exp)) {
                console.log(rawToken);
                const userInfo = await getUserInfoById(rawToken.id);
                res.status(200).json({ userInfo }).end();
            } else {
                res.status(401).end();
            }
        })
    } else {
        res.status(401).end();
    }
})

module.exports = loginRouter;