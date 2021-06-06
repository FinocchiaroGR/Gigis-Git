const mysql = require('mysql2');
const pathSecret = './secret2.js'
const user = require(pathSecret);
const password = require(pathSecret);
const db = require(pathSecret);

const pool = mysql.createPool({
    user : user,
    password: password,
    host : 'localhost',
    database : db
});

module.exports = pool.promise();
