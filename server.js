
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
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
                "EXIT"
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
};

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Please type the name of the department you'd like to add:"
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
};

function addRole() {
    let questions = [
        {
            message: "Please type the name of the role you'd like to add:",
            type: "input",
            name: "role"
        },{
            message: "Please enter the annual salary:",
            type: "input",
            name: "salary"
        },
        
        ];
    
    inquirer
        .prompt(questions)
        .then(function (answer) {
            console.log(answer.role);
            console.log(answer.salary);
            connection.query("INSERT INTO role SET ?", 
            {
                title: answer.role,
                salary: answer.salary
            },
            function (err, res) {
                if (err) throw err;
                startCMS();
            });
        });
};

function addEmployee() {
    let questions = [
        {
            message: "Please enter employee's first name:",
            type: "input",
            name: "first_name"
        },
        {
            message: "Now enter the last name:",
            type: "input",
            name: "last_name"
        },
        {
            message: "Is this employee a manager? '1' for YES, '2' for NO:",
            type: "input",
            name: "roleID"
        },
        {
            message: "Does this employee have a manager? '1' for YES, '0' for NO",
            type: "input",
            name: "managerID"
        },
        
        ];
    
    inquirer
        .prompt(questions)
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                manager_id: answer.managerID,
                role_id: answer.roleID,
                
            },
            function (err, res) {
                if (err) throw err;
                startCMS();
            });
        });
};

function viewDepartments() {

    let query = "SELECT * from department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startCMS();
    });
};

function viewRoles() {

    let query = "SELECT * from role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startCMS();
    });
};

function viewEmployees() {

    var query = "SELECT * from employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startCMS();
    });
};

function updateRole() {
    let questions = [
        {
            message: "Change role to: ('1' for Manager, '2' for Architect)",
            type: "input",
            name: "roleID"
        },
        {
            message: "What's the employee_id?",
            type: "input",
            name: "employeeID"
        },
    ];
    
    inquirer
        .prompt(questions)
        .then(function (answer) {
        
            connection.query("UPDATE employee SET ? WHERE ?", 
            [{
                role_id: answer.roleID        
            },
            {
                employee_id: answer.employeeID    
            }],
           
            function (err, res) {
                if (err) throw err;
                startCMS();
            });
        });
};