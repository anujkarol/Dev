"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonModels_1 = require("../commonModels");
// tslint:disable:max-classes-per-file
class CommonStudentsRequest {
}
exports.CommonStudentsRequest = CommonStudentsRequest;
class CommonStudentResponse extends commonModels_1.ErrorResponse {
    constructor() {
        super();
        this.students = [];
    }
}
exports.CommonStudentResponse = CommonStudentResponse;
//# sourceMappingURL=allocation-model.js.map