"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const connection_1 = require("./connection");
class Teacher {
}
exports.Teacher = Teacher;
// tslint:disable-next-line:max-classes-per-file
class TeacherDataAccess {
    addTeacher(teacher) {
        return new Promise((resolve, reject) => {
            if (teacher == null) {
                reject(Error("Teacher object is null"));
                return;
            }
            const qry = "INSERT into TEACHER(ID, Name) VALUES (?, ?)";
            connection_1.pool.query(qry, [teacher.id, teacher.name], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }
    deleteTeacher(teacher) {
        return new Promise((resolve, reject) => {
            if (teacher == null) {
                reject(Error("Teacher object is null"));
                return;
            }
            const qry = "DELETE FROM TEACHER WHERE  id = ?;";
            connection_1.pool.query(qry, [teacher.id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }
    getTeachersByIds(ids) {
        return new Promise((resolve, reject) => {
            if (ids == null || ids.length <= 0) {
                reject(Error("Given ids is null or empty"));
                return;
            }
            const qry = "SELECT * from Teacher where ID in (?)";
            connection_1.pool.query(qry, [ids], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                const teachers = [];
                const convertedResult = result;
                convertedResult.forEach(i => {
                    const teacher = new Teacher();
                    teacher.id = i.ID;
                    teacher.name = i.NAME;
                    teachers.push(teacher);
                });
                resolve(teachers);
            });
        });
    }
    isTeacherPresent(id) {
        return new Promise((resolve, reject) => {
            if (id == null || id === "") {
                reject(Error("Name is null or empty"));
                return;
            }
            const qry = "SELECT count(*) as cnt from TEACHER where ID = ?";
            connection_1.pool.query(qry, [id], (err, result, fields) => {
                if (err) {
                    logger_1.Log.error(`isTeacherPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);
            });
        });
    }
}
exports.TeacherDataAccess = TeacherDataAccess;
//# sourceMappingURL=teacherDataAccess.js.map