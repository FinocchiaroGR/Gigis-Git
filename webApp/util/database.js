const mysql = require('mysql2');
const secret = require('./secret.js');
const user = secret.user;
const password = secret.password;
const bd = secret.bd;

const pool = mysql.createPool({
    user : user,
    password: password,
    host : 'localhost',
    database : bd
});

module.exports = pool.promise();