"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentDataAccess_1 = require("./data/studentDataAccess");
const teacherDataAccess_1 = require("./data/teacherDataAccess");
const logger_1 = require("./logger");
class BaseService {
    constructor() {
        this.studentDA = new studentDataAccess_1.StudentDataAccess();
        this.teacherDA = new teacherDataAccess_1.TeacherDataAccess();
    }
    isTeacherPresent(name) {
        return new Promise((resolve, reject) => {
            if (name == null || name === "") {
                resolve(false);
                return;
            }
            this.teacherDA.isTeacherPresent(name).catch().catch(e => {
                logger_1.Log.error(`Error in isTeacherPresent = ${JSON.stringify(e)}`);
                return false;
            }).then(v => resolve(v));
        });
    }
    isStudentPresent(name) {
        return new Promise((resolve, reject) => {
            if (name == null || name === "") {
                resolve(false);
                return;
            }
            this.studentDA.isStudentPresent(name).catch(e => {
                logger_1.Log.error(`Error in isStudentPresent = ${JSON.stringify(e)}`);
                return false;
            }).then(v => resolve(v));
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=baseService.js.map