const queryPromise = require('../queryPromise');

const user = {};

user.validateUser = async (id, passwd) => {
    const sql = `select * from users where id='${id}' and passwd='${passwd}';`;
    const res = await queryPromise(sql);
    return res.length > 0;
}

user.getUserRoleStr = async (id) => {
    const sql = `select role_str from users where id='${id}';`;
    const res = await queryPromise(sql);
    return res[0]?.user_role;
}

user.getUserInfoById = async (id) => {
    const sql = `select role_str, name_str from users where id='${id}';`;
    const res = await queryPromise(sql);
    return res[0];
}

user.getUserList = async () => {
    const sql = `select id, name_str, role_str, address, passwd, station from users;`;
    const res = await queryPromise(sql);
    return res;
}

user.alterUserInfo = async ({ id, passwd, name_str, station }) => {
    const sql = `update users set 
        passwd = '${passwd}',
        name_str = '${name_str}',
        station = '${station}'
        where id = '${id}';
    `;
    const res = await queryPromise(sql);
    return res;
}

user.deleteUser = async ({ id }) => {
    const sql = `delete from users where id = '${id}';`;
    const res = await queryPromise(sql);
    return res;
}


// 检查用户是否存在
user.checkUser = async({ id }) => {
    const sql = `select * from users where id = '${id}'`;
    const res = await queryPromise(sql);
    return res.length > 0;
}

// 需配合checkUser使用
user.addUser = async ({ id, passwd, role_str, name_str, address, eth_passwd, station }) => {
    const sql = `insert into users values (
        '${id}',
        '${passwd}',
        '${name_str}',
        '${address}',
        '${role_str}',
        '${eth_passwd}',
        '${station}'
    );`
    const res = await queryPromise(sql);
}

user.getUserEthInfoById = async (id) => {
    console.log('getting eth info');
    const sql = `select address, eth_passwd from users where id = '${id}';`;
    console.log(sql);
    const res = await queryPromise(sql);
    console.log(res)
    return res[0];
}

module.exports = user;