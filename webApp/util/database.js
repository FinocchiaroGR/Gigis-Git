const mysql = require('mysql2');

const pool = mysql.createPool({
    // user : 'doadmin',
    // password : 'lnlosq5d7ulifaug',
    user : 'Test1',
<<<<<<< HEAD
    password: password,
=======
    password: 'Test@password321',
>>>>>>> 1b8abe292fe6757447e8ba8b112e6438c5312a96
    host : 'localhost',
    // host : 'gigisplayhousebd-do-user-9229702-0.b.db.ondigitalocean.com',
    // port : '25060',
    // database : 'gigisplayhousedb'
    database : 'GigisT'
});

module.exports = pool.promise();
