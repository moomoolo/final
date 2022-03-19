const queryPromise = require('./queryPromise');

const db = {};

db.validateUser = async (id, passwd) => {
    const sql = `select * from users where id='${id}' and passwd='${passwd}';`;
    const res = await queryPromise(sql);
    return res.length > 0;
}

db.getUserRoleStr = async (id) => {
    const sql = `select user_role from users where id='${id}';`;
    const res = await queryPromise(sql);
    return res[0]?.user_role;
}

db.getUserInfoById = async (id) => {
    const sql = `select user_role, user_name from users where id='${id}';`;
    const res = await queryPromise(sql);
    return {
        roleStr: res[0].user_role ?? '',
        nameStr: res[0].user_name ?? '',
    };
}

module.exports = db;