const { getOrderDetailByHash } = require('./utils/ethUtils');

(async () => {
    const _ = await getOrderDetailByHash('0xcfbd9d6383ab8761d98eb902a9dabcb635b9c65ba0c9560d551a22af2317928f');
})()

