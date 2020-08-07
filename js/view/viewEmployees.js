var init = require("../../server")
var connection = require("../../db/connect");
const util = require("util");

connection.query = util.promisify(connection.query);

function viewAllEmployees() {
    var query = "SELECT roles.id, first_name, last_name,title, department_name, salary, manager_id FROM department INNER JOIN roles ON department.id = roles.department_id INNER JOIN employee ON roles.id = employee.role_id";
    connection.query(query, function (err, res) {
        console.table(res);
        init.init();
    })

}

module.exports = {
    viewAllEmployees
};