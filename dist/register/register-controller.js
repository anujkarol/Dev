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
const Logger_1 = require("../Logger");
const register_constants_1 = require("./register-constants");
const register_model_1 = require("./register-model");
const register_service_1 = require("./register-service");
class RegisterController {
    constructor() {
        this.service = new register_service_1.RegisterService();
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = new register_model_1.RegisterServiceResponse();
            if (req.body == null) {
                response.status = "FAILED";
                response.errorCode = register_constants_1.RegisterConstants.ERR_VALIDATION;
                response.message = "Request is null or empty";
                Logger_1.Log.error("request body is empty");
                res.status(500);
                res.send(response);
                return;
            }
            const request = this.mapToRequestObject(req);
            response = this.validateRequest(request);
            if (response != null) {
                res.send(response);
                return;
            }
            response = yield this.service.register(request);
            res.status(response.message != null && response.message !== "" ? 500 : 204);
            res.send(response);
        });
    }
    mapToRequestObject(req) {
        const request = new register_model_1.RegisterServiceRequest();
        request.teacher = req.body.teacher;
        request.students = req.body.students;
        return request;
    }
    validateRequest(req) {
        if (req.teacher == null || req.teacher === "") {
            const res = new register_model_1.RegisterServiceResponse();
            res.errorCode = register_constants_1.RegisterConstants.ERR_VALIDATION;
            res.message = "Teacher is empty";
            res.status = "FAILED";
            return res;
        }
        if (req.students == null || req.students.length < 0) {
            const res = new register_model_1.RegisterServiceResponse();
            res.errorCode = register_constants_1.RegisterConstants.ERR_VALIDATION;
            res.message = "Student list is empty";
            res.status = "FAILED";
            return res;
        }
        return null;
    }
}
RegisterController.inst = new RegisterController();
exports.RegisterController = RegisterController;
//# sourceMappingURL=register-controller.js.map