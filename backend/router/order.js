const express = require('express');
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
    
}
)

module.exports = orderRouter;