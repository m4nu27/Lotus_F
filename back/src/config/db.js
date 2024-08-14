const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    // host: process.env.db_host,
    // user: process.env.db_user,
    // password: process.env.db_password,
    // database: process.env.db_database,
    
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_Lotus',

})

connection.connect(function (err) {
    if (err) {
        throw err;
    } else{
        console.log("Mysql connected!");
    }    
});

module.exports = connection;