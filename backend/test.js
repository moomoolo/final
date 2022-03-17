const { getUserRole } = require('./utils/db');

(async () => {
    console.log(
        await getUserRole('test_id')
    );
})();
