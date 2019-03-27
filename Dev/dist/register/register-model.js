"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonModels_1 = require("../commonModels");
// tslint:disable:max-classes-per-file
class RegisterServiceRequest {
    constructor() {
        this.teacher = "";
        this.students = [];
    }
}
exports.RegisterServiceRequest = RegisterServiceRequest;
class RegisterServiceResponse extends commonModels_1.ErrorResponse {
}
exports.RegisterServiceResponse = RegisterServiceResponse;
//# sourceMappingURL=register-model.js.map