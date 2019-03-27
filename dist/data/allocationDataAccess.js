"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const connection_1 = require("./connection");
class Allocation {
}
exports.Allocation = Allocation;
// tslint:disable-next-line:max-classes-per-file
class AllocationDataAccess {
    addAllocation(allocation) {
        return new Promise((resolve, reject) => {
            if (allocation == null) {
                reject(Error("Allocation object is null"));
                return;
            }
            const qry = "INSERT into STUDENT_ALLOCATION(TEACHER_ID, STUDENT_ID) VALUES (?, ?)";
            connection_1.pool.query(qry, [allocation.teacherId, allocation.studentId], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }
    deleteAllocation(allocation) {
        return new Promise((resolve, reject) => {
            if (allocation == null) {
                reject(Error("Allocation object is null"));
                return;
            }
            const qry = "DELETE FROM STUDENT_ALLOCATION WHERE  TEACHER_ID = ? AND STUDENT_ID = ?;";
            connection_1.pool.query(qry, [allocation.teacherId, allocation.studentId], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }
    getAllocationForTeacherId(id) {
        return new Promise((resolve, reject) => {
            if (id == null) {
                reject(Error("Given id is null or empty"));
                return;
            }
            const qry = "SELECT * from STUDENT_ALLOCATION where TEACHER_ID = ?";
            connection_1.pool.query(qry, [id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                logger_1.Log.info(`Result - ${JSON.stringify(result)}`);
                const students = [];
                const convertedResult = result;
                convertedResult.forEach(i => students.push(i.STUDENT_ID));
                resolve(students);
            });
        });
    }
    isAllocationPresent(teacherId, studentId) {
        return new Promise((resolve, reject) => {
            if (teacherId == null || teacherId === "") {
                reject(Error("teacher id is null or empty"));
                return;
            }
            if (studentId == null || studentId === "") {
                reject(Error("student id is null or empty"));
                return;
            }
            const qry = "SELECT count(*) as cnt from STUDENT_ALLOCATION where TEACHER_ID = ? AND STUDENT_ID = ?";
            connection_1.pool.query(qry, [teacherId, studentId], (err, result, fields) => {
                if (err) {
                    logger_1.Log.error(`isAllocationPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);
            });
        });
    }
    commonStudents(teachers) {
        return new Promise((resolve, reject) => {
            if (teachers == null || teachers.length <= 0) {
                return resolve([]);
            }
            const qry = "SELECT STUDENT_ID FROM STUDENT_ALLOCATION WHERE TEACHER_ID IN (?) " +
                "GROUP BY STUDENT_ID HAVING COUNT(*) = ?";
            connection_1.pool.query(qry, [teachers, teachers.length], (err, result, fields) => {
                if (err) {
                    logger_1.Log.error(`commonStudents - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                const students = [];
                const convertedResult = result;
                convertedResult.forEach(i => students.push(i.STUDENT_ID));
                resolve(students);
            });
        });
    }
}
exports.AllocationDataAccess = AllocationDataAccess;
//# sourceMappingURL=allocationDataAccess.js.map