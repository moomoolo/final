const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');

const { validateUser, getUserRoleStr } = require('../utils/db');
const { jwtSecret } = require('../config');

loginRouter.post('/', async (req, res) => {
    console.log(req.body);
    const { id, passwd } = req.body;
    const valid = await validateUser(id, passwd);
    if (valid) {
        const roleStr = await getUserRoleStr(id);
        const token = jwt.sign(
            {
                id,
                roleStr,
            },
            jwtSecret,
            {
                expiresIn: 24 * 360000
            }
        );
        res
        .status(200)
        .json({
            roleStr,
            jwtToken: token
        })
        .end();
        
    } else {
        res
        .status(401)
        .json('access denied')
        .end();
    }
})

module.exports = loginRouter;