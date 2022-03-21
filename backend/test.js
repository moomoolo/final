const { getUserRole } = require('./utils/db');
const { addNewAccount } = require('./utils/eth');


(async () => {
    console.log(
        await addNewAccount('test_pass')
    );
})();
