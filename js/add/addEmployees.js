var init = require("../../server")
var connection = require("../../db/connect");
const util = require("util");
const inquirer = require("inquirer");

connection.query = util.promisify(connection.query);

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "department",
                type: "list",
                message: "What is the employee's department?",
                choices: [
                    "Sales",
                    "Engineering",
                    "Finance",
                    "Legal"
                ]
            },
            // {
            //     name: "role",
            //     type: "list",
            //     message: "What is the employee's role?",
            //     choice: [
            //         "Sales Lead",
            //         "Saleperson",
            //         "Lead Engineer",
            //         "Software Engineer",
            //         "Accountant",
            //         "Legal Team Lead",
            //         "Lawyer"
            //     ]
            // },
            {
                name: "salary",
                type: "input",
                message: "What is the employee's salary?",
            }
        ])
        .then(function (answer) {
            switch (answer.department) {
                case "Sales":
                    var deptID = 1;
                    break;

                case "Engineering":
                    var deptID = 2;
                    break;

                case "Finance":
                    var deptID = 3;
                    break;

                case "Legal":
                    var deptID = 4;
                    break;

            };

            console.log(answer, "department_id = " + deptID)
            // var query = "INSERT INTO"
        })
};

module.exports = {
    addEmployee
};

// INSERT INTO department (department_name)
// VALUES ("Sales"), ("Engineering");

// INSERT INTO roles(title, salary, department_id)
// VALUES ("Sales Lead", 1500000.00, 1), ("Sales Lead", 100000.00, 1), ("Lead Engineer", 150000, 2),("Software Engineer", 120000, 2);

// INSERT INTO employee (first_name, last_name, role_id)
// VALUES ("John", "Doe", 1), ("Ashley", "Rodriguez", 3);

// INSERT INTO employee (first_name, last_name, role_id, manager_id)
// VALUES ("Mike", "Chan", 2, 1), ("Kevin", "Tupik", 4, 3); 