const queryPromise = require('./queryPromise');

const db = {};

db.validateUser = async (id, passwd) => {
    const sql = `select * from users where id='${id}' and passwd='${passwd}';`;
    const res = await queryPromise(sql);
    return res.length > 0;
}

db.getUserRoleStr = async (id) => {
    const sql = `select role_str from users where id='${id}';`;
    const res = await queryPromise(sql);
    return res[0]?.user_role;
}

db.getUserInfoById = async (id) => {
    const sql = `select role_str, name_str from users where id='${id}';`;
    const res = await queryPromise(sql);
    return res[0];
}

db.getUserList = async () => {
    const sql = `select * from users;`;
    const res = await queryPromise(sql);
    return res;
}

db.addUser = async (id, passwd, name_str, address, role_str) => {
    const querySql = `select * from users where id='${id}';`;
    const res = await queryPromise(querySql);
    if (res.length > 0) {
        return {
            result: false,
            msg: 'id已存在'
        };
    } else {
        const insertSql = `insert into users values('${id}', '${passwd}', '${name_str}', '${address}', '${role_str}')`;
        const res = await queryPromise(querySql);
        return { result: true };
    }
}

db.alterUserInfo = async (id, passwd, name_str, address, role_str) => {
    const sql = `update users set 
        passwd = '${passwd}',
        role_str = '${role_str}',
        name_str = '${name_str}',
        address = '${address}',
        where id = '${id}';
    `;
    const res = queryPromise(sql);
}

module.exports = db;