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
const allocation_constants_1 = require("./allocation-constants");
const allocation_model_1 = require("./allocation-model");
const allocation_service_1 = require("./allocation-service");
class AllocationController {
    constructor() {
        this.service = new allocation_service_1.AllocationService();
    }
    findCommonStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.mapRequest(req);
            let response = this.validateRequest(request);
            if (response == null) {
                response = yield this.service.findCommonStudent(request);
            }
            res.status(response.errorCode !== "" ? 500 : 200);
            res.send(response);
        });
    }
    mapRequest(req) {
        const request = new allocation_model_1.CommonStudentsRequest();
        if (req.query.teacher instanceof Array) {
            request.teachers = req.query.teacher;
        }
        if (typeof req.query.teacher === "string") {
            request.teachers = [req.query.teacher];
        }
        return request;
    }
    validateRequest(request) {
        if (request.teachers == null || request.teachers.length <= 0) {
            const response = new allocation_model_1.CommonStudentResponse();
            response.errorCode = allocation_constants_1.AllocationConstants.ERR_CODE_NO_TEACHERS;
            response.message = "Teacher list is empty";
            return response;
        }
        return null;
    }
}
AllocationController.inst = new AllocationController();
exports.AllocationController = AllocationController;
//# sourceMappingURL=allocation-controller.js.map