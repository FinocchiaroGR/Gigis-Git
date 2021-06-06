const mysql = require('mysql2');
const user = require('./secret.js');
const password = require('./secret.js');
const bd = require('./secret.js');

const pool = mysql.createPool({
    user : user,
    password: password,
    host : 'localhost',
    database : bd
});

module.exports = pool.promise();
