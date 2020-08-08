var init = require("../../server")
var connection = require("../../db/connect");
const inquirer = require("inquirer");


function test() {
    var query = "SELECT * FROM department";
    let departName = [];
    let departInfo = [];
    connection.query(query, function (err, data) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            departName.push(data[i].department_name);
            departInfo.push(data[i]);
        }
        console.log(departName);
        console.log(departInfo);
    })
}

function addDepartment() {
    inquirer
        .prompt({
            name: "departmentAdd",
            type: "input",
            message: "What is the department's name?"
        }).then(function (answer) {
            var query = "INSERT INTO department (department_name) VALUES (?)";
            connection.query(query, [answer.departmentAdd], function (err, res) {
                // console.log(res);
                console.log("New department added!");
                init.init();
            })
        })
};

function addRole() {
    var query = "SELECT * FROM department";
    var deptName = [];
    var deptInfo = [];

    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            deptName.push(res[i].department_name);
            deptInfo.push(res[i]);
        }
        console.log(deptName);
        console.log(deptInfo);


        inquirer.prompt([

            {
                name: "selectDepartment",
                type: "list",
                message: "Choose a department",
                choices: deptName
            },
            {
                name: "newRole",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "newSalary",
                type: "input",
                message: "What is the salary of the role?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function (answer) {
            console.log(answer);
            var deptID;
            for (var i = 0; i < deptInfo.length; i++) {
                if (answer.selectDepartment === deptInfo[i].department_name) {
                    deptID = deptInfo[i].id;
                    console.log(deptID);
                }
            }

            var query = "INSERT INTO roles SET ?";
            connection.query(query,
                {
                    title: answer.newRole,
                    salary: answer.newSalary,
                    department_id: deptID
                },
                function (err, res) {
                    console.log("New role added!");
                    init.init();
                })
        })

    })
}

function addEmployee() {
    var query = "SELECT title FROM roles";
    var arr = [];

    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            arr.push(res[i].title);
        }
        return arr;
    })

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
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: arr
            }
        ]).then(function (answer) {
            console.log(answer);
            // var query = "INSERT INTO"
            init.init();
        })
};

module.exports = {
    test, // test
    addDepartment,
    addRole,
    addEmployee
};

