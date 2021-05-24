const mysql = require('mysql2');

const pool = mysql.createPool({
    // user : 'doadmin',
    // password : 'lnlosq5d7ulifaug',
    user : 'root',
    password: 'G21248055',
    host : 'localhost',
    // host : 'gigisplayhousebd-do-user-9229702-0.b.db.ondigitalocean.com',
    // port : '25060',
    // database : 'gigisplayhousedb'
    database : 'GigisT'
});

module.exports = pool.promise();