const { getStationOrderToReceive, getOrderActionsByHash } = require('./utils/ethUtils');

(async () => {
    const res = await getOrderActionsByHash('0xc22331af31911e4c5adeb5a07fe613f3ab60374d46ada4a14d90f76b94c45c96');
    console.log(res);
})()

