const mysql = require('mysql2');

const pool = mysql.createPool({
    user : 'calificaciones_user',
    password: '7yZCmYoqWa6*Wz!t7_@2nMMqc8eH',
    host : 'localhost',
    database : 'calificaciones'
});

module.exports = pool.promise();