DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL, 
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  manager_id INT NULL,
  role_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES role (role_id)
);

INSERT INTO department (name)
VALUES ("Information Technology"),("Legal");

INSERT INTO role (title, salary)
VALUES ("Manager", 150000), ("Architect",100000);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("George", "Washington", 01, 2),("Abe", "Lincoln", 01, 2 ), ("Suzy", "Anthony", 01, 2), ("Benny", "Franklin", 0, 1);