
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Mysql22!",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    startCMS();
});

function startCMS() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Update a Role",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.selection) {
                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Departments":
                    viewDepartments();
                    break;

                case "View all Roles":
                    viewRoles();
                    break;

                case "View all Employees":
                    viewEmployees();
                    break;

                case "Update a Role":
                    updateRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Which department would you like to create?"
        })
        .then(function (answer) {
            console.log(answer.department);
            connection.query("INSERT INTO department SET ?", 
            {
                name: answer.department,
            },
            function (err, res) {
                if (err) throw err;
                startCMS();
            });
        });
}