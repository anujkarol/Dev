import mysql = require("mysql");

// tslint:disable:object-literal-sort-keys
export const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "school"
});
