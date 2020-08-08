USE employee_trackerDB;

-- Initial set up 
INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"),("Finance"), ("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1), ("Salesperson", 80000.00, 1), ("Lead Engineer", 150000, 2),("Software Engineer", 120000, 2),("Account Manager", 150000, 3),("Accountant", 120000, 3),("Legal Team Lead", 250000, 4),("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1), ("Ashley", "Rodriguez", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1), ("Kevin", "Tupik", 4, 2), ("Nalia", "Brown", 6, 1); 

-- To get tables 
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

-- To get the whole table 
SELECT employee.id, first_name, last_name, title, department_name, department_id, salary, manager_id
FROM department
INNER JOIN roles ON department.id = roles.department_id
INNER JOIN employee ON roles.id = employee.role_id
ORDER BY employee.id ASC;

-- To test getting manager info 
SELECT * FROM employee
WHERE manager_id IS NULL;

-- Update testing 
UPDATE employee
SET role_id = 7, manager_id = 2
WHERE first_name = "Nalia" AND last_name = "Brown";

-- To test view employees by manager 
SELECT employee.id, first_name, last_name, department_name
FROM department 
INNER JOIN roles ON department.id = roles.department_id
INNER JOIN employee ON roles.id = employee.role_id
WHERE employee.first_name = "John" AND employee.last_name = "Doe"; 