"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_constants_1 = require("./student-constants");
const student_model_1 = require("./student-model");
const student_service_1 = require("./student-service");
class StudentController {
    constructor() {
        this.service = new student_service_1.StudentService();
    }
    suspendStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.mapRequest(req);
            let response;
            if (request.studentId == null || request.studentId === "") {
                response = new student_model_1.StudentSuspendResponse();
                response.errorCode = student_constants_1.StudentConstant.ERR_CODE_NO_STUDENT;
                response.message = "Student ID is null or empty";
                response.status = student_constants_1.StudentConstant.STATUS_FAILED;
                res.status(500);
                res.send(response);
            }
            response = yield this.service.suspendStudent(request);
            res.status(response != null && response.errorCode != null && response.errorCode !== "" ? 500 : 200);
            res.send(response);
        });
    }
    mapRequest(req) {
        const request = new student_model_1.StudentSuspendRequest();
        request.studentId = req != null && req.body != null && req.body.student ? req.body.student : "";
        return request;
    }
}
StudentController.inst = new StudentController();
exports.StudentController = StudentController;
//# sourceMappingURL=student-controller.js.map