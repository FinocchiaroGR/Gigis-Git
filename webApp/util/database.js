const mysql = require('mysql2');
const user = require('./secret.js');
const password = require('./secret.js');
const db = require('./secret.js');

const pool = mysql.createPool({
    user : user,
    password: password,
    host : 'localhost',
    database : db
});

module.exports = pool.promise();
