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
const logger_1 = require("../logger");
const allocationDataAccess_1 = require("./../data/allocationDataAccess");
const register_constants_1 = require("./register-constants");
const register_model_1 = require("./register-model");
class RegisterService extends baseService_1.BaseService {
    constructor() {
        super();
        this.allocationDA = new allocationDataAccess_1.AllocationDataAccess();
    }
    register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield this.checkIfIdsPresent(request);
                if (response != null) {
                    return response;
                }
                response = yield this.allocate(request);
                return response;
            }
            catch (e) {
                response = new register_model_1.RegisterServiceResponse();
                response.errorCode = register_constants_1.RegisterConstants.ERR_ID_NOT_PRESENT;
                response.message = e.message;
                response.status = register_constants_1.RegisterConstants.STATUS_FAILED;
                return response;
            }
        });
    }
    allocate(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const v of request.students) {
                const allocation = new allocationDataAccess_1.Allocation();
                allocation.studentId = v;
                allocation.teacherId = request.teacher;
                const allocationPresent = yield this.allocationDA.
                    isAllocationPresent(allocation.teacherId, allocation.studentId)
                    .catch(e => false);
                if (allocationPresent) {
                    const response = new register_model_1.RegisterServiceResponse();
                    response.status = register_constants_1.RegisterConstants.STATUS_SUCCESS;
                    promises.push(Promise.resolve(response));
                }
                else {
                    promises.push(this.allocationDA.addAllocation(allocation).then(aStatus => {
                        const response = new register_model_1.RegisterServiceResponse();
                        response.status = register_constants_1.RegisterConstants.STATUS_SUCCESS;
                        if (!aStatus) {
                            response.status = register_constants_1.RegisterConstants.STATUS_FAILED;
                            response.errorCode = register_constants_1.RegisterConstants.ERR_ALLOCATION_FAILED;
                            response.message = `Allocation of Student ${v} is Failed`;
                        }
                        return response;
                    }).catch(e => {
                        logger_1.Log.error(`Allocation of ${allocation.studentId} with ${allocation.teacherId} ` +
                            `Failed : Reason = ${JSON.stringify(e)}`);
                        const response = new register_model_1.RegisterServiceResponse();
                        response.status = register_constants_1.RegisterConstants.STATUS_FAILED;
                        response.errorCode = register_constants_1.RegisterConstants.ERR_ALLOCATION_FAILED;
                        response.message = `Allocation of Student ${v} is Failed`;
                        return response;
                    }));
                }
            }
            const results = yield Promise.all(promises);
            return this.prepareAllocationResponse(results);
        });
    }
    prepareAllocationResponse(promises) {
        let response;
        if (promises == null || promises.length <= 0) {
            response = new register_model_1.RegisterServiceResponse();
            response.status = register_constants_1.RegisterConstants.STATUS_FAILED;
            response.errorCode = register_constants_1.RegisterConstants.ERR_ALLOCATION_FAILED;
            response.message = "Unknown Error";
            return response;
        }
        if (promises.some(v => v.status === register_constants_1.RegisterConstants.STATUS_FAILED, this)) {
            response = new register_model_1.RegisterServiceResponse();
            response.status = register_constants_1.RegisterConstants.STATUS_PARTIAL;
            response.errorCode = register_constants_1.RegisterConstants.ERR_ALLOCATION_FAILED;
            response.message = "";
            promises.filter(v => v.status === register_constants_1.RegisterConstants.STATUS_FAILED, this)
                .forEach(i => response.message = response.message + "\n" + i.message);
            return response;
        }
        response = new register_model_1.RegisterServiceResponse();
        response.status = register_constants_1.RegisterConstants.STATUS_SUCCESS;
        return response;
    }
    checkIfIdsPresent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            const ids = request.students.slice();
            ids.unshift(request.teacher);
            promises.push(this.isTeacherPresent(request.teacher));
            request.students.forEach((v, i, a) => {
                promises.push(this.isStudentPresent(v));
            });
            const results = yield Promise.all(promises);
            let error = "";
            results.forEach((v, i, a) => {
                if (!v) {
                    error = error === "" ? "ID(s) Not available :" : error;
                    error = error + ids[i] + ",";
                }
            }, this);
            if (error !== "") {
                const response = new register_model_1.RegisterServiceResponse();
                response.status = register_constants_1.RegisterConstants.STATUS_FAILED;
                response.errorCode = register_constants_1.RegisterConstants.ERR_ID_NOT_PRESENT;
                response.message = error.slice(0, error.length - 1);
                return response;
            }
            return null;
        });
    }
}
exports.RegisterService = RegisterService;
//# sourceMappingURL=register-service.js.map