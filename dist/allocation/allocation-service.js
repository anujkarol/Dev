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
const allocationDataAccess_1 = require("./../data/allocationDataAccess");
const allocation_constants_1 = require("./allocation-constants");
const allocation_model_1 = require("./allocation-model");
class AllocationService extends baseService_1.BaseService {
    constructor() {
        super();
        this.allocationDA = new allocationDataAccess_1.AllocationDataAccess();
    }
    findCommonStudent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.allocationDA.commonStudents(request.teachers);
                const response = new allocation_model_1.CommonStudentResponse();
                response.students = students;
                return response;
            }
            catch (err) {
                const response = new allocation_model_1.CommonStudentResponse();
                response.errorCode = allocation_constants_1.AllocationConstants.ERR_CODE_UNKNOWN;
                response.message = err != null ? err.message : "Technical Error in Find common students";
                return err;
            }
        });
    }
}
exports.AllocationService = AllocationService;
//# sourceMappingURL=allocation-service.js.map