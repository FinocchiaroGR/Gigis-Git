const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    database: 'gigisplayhousebd_v6',
    password: ''
});

module.exports = pool.promise();