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
const baseService_1 = require("../baseService");
const student_constants_1 = require("./student-constants");
const student_model_1 = require("./student-model");
class StudentService extends baseService_1.BaseService {
    suspendStudent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.studentDA.suspendStudent(request.studentId);
                const response = new student_model_1.StudentSuspendResponse();
                response.status = student_constants_1.StudentConstant.STATUS_SUCCESS;
                if (!result) {
                    response.errorCode = student_constants_1.StudentConstant.ERR_CODE_SUSPEND_FAILED;
                    response.message = "Error while Suspending";
                    response.status = student_constants_1.StudentConstant.STATUS_FAILED;
                }
                return response;
            }
            catch (err) {
                const response = new student_model_1.StudentSuspendResponse();
                response.errorCode = student_constants_1.StudentConstant.ERR_CODE_SUSPEND_FAILED;
                response.message = "Error while Suspending";
                response.status = student_constants_1.StudentConstant.STATUS_FAILED;
                return response;
            }
        });
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student-service.js.map