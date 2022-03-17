const mysql = require('mysql');

const conn = mysql.createPool({
    host: '43.134.197.211',
    port: 3306,
    user: 'root',
    password: 'giveme7',
    database: 'transport'
});

const queryPromise = async (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        }) 
    })
}

module.exports = queryPromise;