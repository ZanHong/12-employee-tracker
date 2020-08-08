var init = require("../../server")
var connection = require("../../db/connect");
const inquirer = require("inquirer");

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
                console.log("New department added! \n");
                init.init();
            });
        });
};

function addRole() {
    var query = "SELECT * FROM department";
    var deptName = [];
    var deptInfo = [];

    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            deptName.push(res[i].department_name);
            deptInfo.push(res[i]);
        };
        // console.log(deptName);
        // console.log(deptInfo);

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
            // console.log(answer);
            var deptID;
            for (var i = 0; i < deptInfo.length; i++) {
                if (answer.selectDepartment === deptInfo[i].department_name) {
                    deptID = deptInfo[i].id;
                    console.log(deptID);
                }
            };

            var query = "INSERT INTO roles SET ?";
            connection.query(query,
                {
                    title: answer.newRole,
                    salary: answer.newSalary,
                    department_id: deptID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New role added! \n");
                    init.init();
                });
        });

    });
};

async function getRoleInfo() {
    var query = "SELECT * FROM roles";
    var roleInfo = await connection.query(query);

    return roleInfo;
};

async function getRoleName() {
    var roleNameArr = [];
    var data = await getRoleInfo();

    for (var i = 0; i < data.length; i++) {
        roleNameArr.push(data[i].title);
    }
    return roleNameArr;
};

async function getManagerInfo() {
    var query = "SELECT * FROM employee WHERE manager_id IS NULL;"
    var managerInfo = await connection.query(query);

    return managerInfo;
};

async function getManagerName() {
    var managerNameArr = [];
    var data = await getManagerInfo();

    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        managerNameArr.push(data[i].first_name + " " + data[i].last_name);
    }
    // console.log(managerNameArr);
    return managerNameArr;
};

async function addEmployee() {
    var roleInfo = await getRoleInfo();
    var roleName = await getRoleName();
    var managerInfo = await getManagerInfo();
    var managerName = await getManagerName();

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
                choices: roleName
            },
            {
                name: "managerName",
                type: "list",
                message: "What is the name of the employee's manager?",
                choices: [...managerName, "This is the manager"]
            }
        ]).then(function (answer) {
            // console.log(answer);
            // console.log(managerInfo);
            var roleID;
            var managerID;

            for (var i = 0; i < roleInfo.length; i++) {
                if (answer.role === roleInfo[i].title) {
                    roleID = roleInfo[i].id;
                    // console.log(roleID);
                }
            };

            for (var i = 0; i < managerInfo.length; i++) {
                if (answer.managerName === managerInfo[i].first_name + " " + managerInfo[i].last_name) {
                    managerID = managerInfo[i].id;
                    // console.log("Manager ID is " + managerID);
                }
            };

            var query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleID,
                    manager_id: managerID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New employee added! \n");
                    init.init();
                }
            );

            // init.init();
        })
};

module.exports = {
    getRoleInfo,
    getRoleName,
    getManagerInfo,
    getManagerName,
    addDepartment,
    addRole,
    addEmployee
};