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
    const sql = `select id, name_str, role_str, address, passwd from users;`;
    const res = await queryPromise(sql);
    return res;
}

db.alterUserInfo = async ({ id, passwd, name_str }) => {
    const sql = `update users set 
        passwd = '${passwd}',
        name_str = '${name_str}',
        where id = '${id}';
    `;
    const res = await queryPromise(sql);
    return res;
}

db.deleteUser = async ({ id }) => {
    const sql = `delete from users where id = '${id}';`;
    const res = await queryPromise(sql);
    return res;
}


// 检查用户是否存在
db.checkUser = async({ id }) => {
    const sql = `select * from users where id = '${id}'`;
    const res = await queryPromise(sql);
    return res.length > 0;
}

// 需配合checkUser使用
db.addUser = async ({ id, passwd, role_str, name_str, address, eth_passwd }) => {
    const sql = `insert into users values (
        '${id}',
        '${passwd}',
        '${name_str}',
        '${address}',
        '${role_str}',
        '${eth_passwd}'
    );`
    const res = await queryPromise(sql);
}

module.exports = db;