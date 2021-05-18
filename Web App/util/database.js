const mysql = require('mysql2');

const pool = mysql.createPool({
    user : 'doadmin',
    password : 'lnlosq5d7ulifaug',
    host : 'gigisplayhousebd-do-user-9229702-0.b.db.ondigitalocean.com',
    port : '25060',
    database : 'gigisplayhousedb'
});

module.exports = pool.promise();