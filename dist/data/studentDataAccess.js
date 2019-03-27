"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const connection_1 = require("./connection");
class Student {
}
exports.Student = Student;
// tslint:disable-next-line:max-classes-per-file
class StudentDataAccess {
    addStudent(student) {
        return new Promise((resolve, reject) => {
            if (student == null) {
                reject(Error("Student object is null"));
                return;
            }
            const qry = "INSERT into STUDENT(ID, Name, Active) VALUES (?, ?, ?)";
            connection_1.pool.query(qry, [student.id, student.name, student.active], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }
    deleteStudent(student) {
        return new Promise((resolve, reject) => {
            if (student == null) {
                reject(Error("Student object is null"));
                return;
            }
            const qry = "DELETE FROM STUDENT WHERE  id = ?;";
            connection_1.pool.query(qry, [student.id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }
    getStudentsByIds(ids) {
        return new Promise((resolve, reject) => {
            if (ids == null || ids.length <= 0) {
                reject(Error("Given ids is null or empty"));
                return;
            }
            const qry = "SELECT * from STUDENT where ID in (?)";
            connection_1.pool.query(qry, [ids], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                const students = [];
                const convertedResult = result;
                convertedResult.forEach(i => {
                    const student = new Student();
                    student.id = i.ID;
                    student.name = i.Name;
                    student.active = i.Active;
                    students.push(student);
                });
                resolve(students);
            });
        });
    }
    isStudentPresent(id) {
        return new Promise((resolve, reject) => {
            if (id == null || id === "") {
                reject(Error("Name is null or empty"));
                return;
            }
            const qry = "SELECT count(*) as cnt from STUDENT where ID = ?";
            connection_1.pool.query(qry, [id], (err, result, fields) => {
                if (err) {
                    logger_1.Log.error(`isStudentPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);
            });
        });
    }
    suspendStudent(id) {
        return new Promise((resolve, reject) => {
            if (id == null || id === "") {
                reject("ID is null or empty");
                return;
            }
            const qry = "update STUDENT set ACTIVE = 0 WHERE ID = ? ";
            connection_1.pool.query(qry, [id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }
}
exports.StudentDataAccess = StudentDataAccess;
//# sourceMappingURL=studentDataAccess.js.map