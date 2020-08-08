var init = require("../../server")
var connection = require("../../db/connect");
// const util = require("util");

// connection.query = util.promisify(connection.query);
function viewDepartment() {
    var query = "SELECT * FROM department;";
    connection.query(query, function (err, res) {
        console.table(res);
        init.init();
    })
};

function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        console.table(res);
        init.init();
    })
}

function viewAllEmployees() {
    var query = "SELECT employee.id, first_name, last_name, title, department_name, department_id, salary, manager_id FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id ORDER BY employee.id ASC;";
    connection.query(query, function (err, res) {
        console.table(res);
        init.init();
    })

}

module.exports = {
    viewDepartment,
    viewRoles,
    viewAllEmployees
};