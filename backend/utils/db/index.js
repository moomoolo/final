const queryPromise = require('./queryPromise');
const user = require('./user');
const station = require('./station');

const db = {
    ...user,
    ...station,
};


module.exports = db;