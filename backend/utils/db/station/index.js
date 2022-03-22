const queryPromise = require('../queryPromise');
const uuid = require('uuid')
const Web3 = require('web3')
const station = {};

station.getStationList = async () => {
    const sql = `select id, name_str, addr_str from stations;`;
    const res = await queryPromise(sql);
    return res;
}

station.alterStation = async ({ id, name_str, addr_str }) => {
    const sql = `update stations set
        name_str = '${name_str}',
        addr_str = '${addr_str}'
        where id = '${id}'
    `;
    const res = await queryPromise(sql);
}

station.addNewStation = async ({ name_str, addr_str }) => {
    const id = Web3.utils.sha3(uuid.v4());
    const sql = `insert into stations values (
        '${id}',
        '${name_str}',
        '${addr_str}'
    );`;
    const res = await queryPromise(sql);
}

station.deleteStation = async ({ id }) => {
    const sql = `delete from stations where id='${id}';`;
    const res = await queryPromise(sql);
}

module.exports = station;
