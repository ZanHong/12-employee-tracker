USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES ("Manager", 1500000.00, 1), ("Sales Lead", 100000.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id);
VALUES ("Mike", "Chan", 2, 1);