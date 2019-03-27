"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
// tslint:disable:object-literal-sort-keys
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "school"
});
//# sourceMappingURL=connection.js.map