const mysql = require('mysql2')

//Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass*',
    database: 'employee_tracker'
})

module.exports = connection;