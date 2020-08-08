var init = require("../../server")
var connection = require("../../db/connect");
const inquirer = require("inquirer");
var getInfo = require("../add/add");

async function getEmployeeInfo() {
    var query = "SELECT * FROM employee";
    var employeeInfo = await connection.query(query);

    return employeeInfo;
};

async function getEmployeeFirstName() {
    var employeeFirstNameArr = [];
    var data = await getEmployeeInfo();

    for (var i = 0; i < data.length; i++) {
        employeeFirstNameArr.push(data[i].first_name);
    }
    return employeeFirstNameArr;
};

async function getEmployeeLastName() {
    var employeeLastNameArr = [];
    var data = await getEmployeeInfo();

    for (var i = 0; i < data.length; i++) {
        employeeLastNameArr.push(data[i].last_name);
    }
    return employeeLastNameArr;
};

async function updateRole() {
    var roleInfo = await getInfo.getRoleInfo();
    var roleName = await getInfo.getRoleName();
    var managerInfo = await getInfo.getManagerInfo();
    var managerName = await getInfo.getManagerName();
    var employeeInfo = await getEmployeeInfo();
    var employeeFirstName = await getEmployeeFirstName();
    var employeeLastName = await getEmployeeLastName();

    inquirer
        .prompt([
            {
                name: "firstName",
                type: "list",
                message: "What is the employee's first name?",
                choices: employeeFirstName
            },
            {
                name: "lastName",
                type: "list",
                message: "What is the employee's last name?",
                choices: employeeLastName
            },
            {
                name: "roleUpdate",
                type: "list",
                message: "What is the employee's updated role?",
                choices: roleName
            },
            {
                name: "managerNameUpdate",
                type: "list",
                message: "What is the name of the employee's manager?",
                choices: [...managerName, "This is the manager"]
            }
        ]).then(function (answer) {
            var selectedFirstName;
            var selectedLastName;
            var indexFirst;
            var indexLast;

            for (var i = 0; i < employeeInfo.length; i++) {
                if (answer.firstName === employeeFirstName[i]) {
                    selectedFirstName = employeeFirstName[i];
                    indexFirst = i;
                }
            };

            for (var i = 0; i < employeeInfo.length; i++) {
                if (answer.lastName === employeeLastName[i]) {
                    selectedLastName = employeeLastName[i];
                    indexLast = i;
                }
            };

            for (var i = 0; i < roleInfo.length; i++) {
                if (answer.roleUpdate === roleInfo[i].title) {
                    roleID = roleInfo[i].id;
                }
            };

            for (var i = 0; i < managerInfo.length; i++) {
                if (answer.managerNameUpdate === managerInfo[i].first_name + " " + managerInfo[i].last_name) {
                    managerID = managerInfo[i].id;
                } else if (answer.managerNameUpdate === "This is the manager") {
                    managerID = null;
                }
            };

            if (indexFirst != indexLast) {
                console.log("Error! Make sure you got the right name! Please try again! \n");
                updateRole();
            } else if (answer.managerNameUpdate === answer.firstName + " " + answer.lastName) {
                console.log("You've selected the employee as their own manager themselves. Please try again! \n");
                updateRole();
            };

            var query = "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ?";
            connection.query(query, [roleID, managerID, answer.firstName], function (err, res) {
                if (err) throw err;
                console.log("Employee Updated! \n");
                init.init();
            }
            );
        })
};

module.exports = {
    updateRole
};