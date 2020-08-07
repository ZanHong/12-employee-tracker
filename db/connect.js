var mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",

    port: "3306",

    user: "root",

    password: "mok920322",

    database: "employee_trackerDB"
});

connection.connect((err) => {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
});

// connection.query = util.promisify(connection.query);

module.exports = connection;