var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: "3306",

    user: "root",

    password: "mok920322",

    database: "employee_trackerDB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    welcome();

});

function welcome() {
    console.log(`
    _______________________________________________________________________________
   |                                                                               |
   |                                                                               |
   |         _____                       _                                         |
   |        |  ___|                     | |                                        |
   |        | |___   _________   _____  | |  _____   _   _   _____   _____         |
   |        |  ___| |  _   _  | |  _  | | | |  _  | | | | | |  __ | |  __ |        |
   |        | |___  | | | | | | | |_| | | | | |_| | | |_| | |  ___| |  ___|        | 
   |        |_____| |_| |_| |_| |  ___| |_| |_____| |___  | |_____| |_____|        |
   |                            | |                  ___| |                        |
   |                            |_|                 |_____|                        |
   |                                                                               |
   |              _____                           _                                |
   |             |__ __|                         | |                               |
   |               | |    ____   ______   _____  | | ___   _____   ____            |
   |               | |   |  __| |  _   | |  ___| | |/  /  |  __ | |  __|           |
   |               | |   | |    | |_|  | | |___  |  _  |  |  ___| | |              |
   |               |_|   |_|    |___/|_| |_____| |_| |_|  |_____| |_|              |
   |                                                                               |
   |                                                                               |
   |_______________________________________________________________________________|
   `);
    init();
}

function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would yu like to do?",
            choices: [
                "View All Employees",
                "Exit"
            ]
        }).then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                default:
                    console.log("Logging off!")
                    connection.end();
            }
        });
};

function viewEmployees() {
    var query = "SELECT first_name, last_name,title, department_name, salary, role_id, manager_id FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id";
    connection.query(query, function (err, res) {
        console.table(res);
        init();
    })

}