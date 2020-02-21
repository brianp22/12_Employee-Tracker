
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
    runSearch();
});

