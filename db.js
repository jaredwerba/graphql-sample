const oracledb = require('oracledb');

async function initialize() {
    try {
        await oracledb.createPool({
            user: 'your_username',
            password: 'your_password',
            connectString: 'localhost:1521/your_database'
        });
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization failed', err);
    }
}

async function close() {
    await oracledb.getPool().close();
}

module.exports = { initialize, close };
≈


