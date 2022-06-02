const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'app'
});

// 외부에서 db객체 사용할 수 있도록 export
exports.pool = pool;