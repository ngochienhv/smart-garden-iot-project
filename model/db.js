var mysql = require('mysql');

var con = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    port: 3306,
    user: "bb9bbad635d32f",
    password: "6b5585ff",
    database: "heroku_9f7763c54a62eb0"
})

module.exports = con;