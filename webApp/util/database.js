const mysql = require('mysql2');
const password = require ('./passwordBD');

const pool = mysql.createPool({
    // user : 'doadmin',
    // password : 'lnlosq5d7ulifaug',
    user : 'Test1',
    password: password,
    host : 'localhost',
    // host : 'gigisplayhousebd-do-user-9229702-0.b.db.ondigitalocean.com',
    // port : '25060',
    // database : 'gigisplayhousedb'
    database : 'GigisT'
});

module.exports = pool.promise();
