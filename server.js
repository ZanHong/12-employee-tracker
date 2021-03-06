var inquirer = require("inquirer");
var cTable = require("console.table");
var connection = require("./db/connect")
var view = require("./js/view/view");
var add = require("./js/add/add");
var update = require("./js/update/update");

welcome();

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
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Role",
                "Exit"
            ]
        }).then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    view.viewAllEmployees();
                    break;

                case "View Departments":
                    view.viewDepartment();
                    break;

                case "View Roles":
                    view.viewRoles();
                    break;

                case "Add Employee":
                    add.addEmployee();
                    break;

                case "Add Department":
                    add.addDepartment();
                    break;

                case "Add Role":
                    add.addRole();
                    break;


                case "Update Role":
                    update.updateRole();
                    break;

                default:
                    console.log("Logging off!")
                    process.exit();
            }
        });
};

module.exports.init = init;
