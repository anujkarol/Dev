import {BaseService} from "../baseService";
import { Log } from "../logger";
import { Allocation, AllocationDataAccess} from "./../data/allocationDataAccess";
import {RegisterConstants} from "./register-constants";
import { RegisterServiceRequest,
        RegisterServiceResponse } from "./register-model";

export class RegisterService extends BaseService {

    public allocationDA: AllocationDataAccess;

    constructor() {
        super();
        this.allocationDA =  new AllocationDataAccess();
    }

    public async register(request: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        let response: RegisterServiceResponse;

        try {
            response = await this.checkIfIdsPresent(request);

            if (response != null) {
                return response;
            }

            response =  await this.allocate(request);

            return response;

        } catch (e) {
            response =  new RegisterServiceResponse();
            response.errorCode = RegisterConstants.ERR_ID_NOT_PRESENT;
            response.message =  e.message;
            response.status = RegisterConstants.STATUS_FAILED;

            return response;
        }
    }

    public async allocate(request: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const  promises: Array<Promise<RegisterServiceResponse>> = [];

        for (const v of request.students) {
            const allocation: Allocation = new Allocation();
            allocation.studentId =  v;
            allocation.teacherId =  request.teacher;
            const allocationPresent = await this.allocationDA.
                            isAllocationPresent(allocation.teacherId, allocation.studentId)
                            .catch(e => false);
            if (allocationPresent) {

                const response: RegisterServiceResponse = new RegisterServiceResponse();
                response.status = RegisterConstants.STATUS_SUCCESS;
                promises.push(Promise.resolve(response));

            } else {

                promises.push(this.allocationDA.addAllocation(allocation).then( aStatus => {
                    const response: RegisterServiceResponse = new RegisterServiceResponse();
                    response.status = RegisterConstants.STATUS_SUCCESS;
                    if (!aStatus) {
                        response.status = RegisterConstants.STATUS_FAILED;
                        response.errorCode = RegisterConstants.ERR_ALLOCATION_FAILED;
                        response.message = `Allocation of Student ${v} is Failed`;
                    }

                    return response;
                }).catch(e => {
                    Log.error(`Allocation of ${allocation.studentId} with ${allocation.teacherId} ` +
                              `Failed : Reason = ${JSON.stringify(e)}`);
                    const response: RegisterServiceResponse = new RegisterServiceResponse();

                    response.status = RegisterConstants.STATUS_FAILED;
                    response.errorCode = RegisterConstants.ERR_ALLOCATION_FAILED;
                    response.message = `Allocation of Student ${v} is Failed`;

                    return response;
                }));
            }

        }

        const results  = await Promise.all(promises);

        return this.prepareAllocationResponse(results);
    }

    public prepareAllocationResponse(promises: RegisterServiceResponse[]): RegisterServiceResponse {
        let response: RegisterServiceResponse;

        if (promises ==  null || promises.length <= 0 ) {
            response = new RegisterServiceResponse();

            response.status = RegisterConstants.STATUS_FAILED;
            response.errorCode = RegisterConstants.ERR_ALLOCATION_FAILED;
            response.message = "Unknown Error";

            return response;
        }

        if (promises.some(v => v.status === RegisterConstants.STATUS_FAILED, this)) {
            response = new RegisterServiceResponse();

            response.status = RegisterConstants.STATUS_PARTIAL;
            response.errorCode = RegisterConstants.ERR_ALLOCATION_FAILED;
            response.message = "";

            promises.filter(v => v.status === RegisterConstants.STATUS_FAILED, this)
                .forEach(i => response.message = response.message + "\n"  + i.message);

            return response;
        }

        response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_SUCCESS;

        return response;
    }

    public async checkIfIdsPresent(request: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const promises: Array<Promise<boolean>> = [];
        const ids: string[] = request.students.slice();
        ids.unshift(request.teacher);

        promises.push(this.isTeacherPresent(request.teacher));

        request.students.forEach( (v, i, a) => {
            promises.push(this.isStudentPresent(v));
        });

        const results: boolean[] =  await Promise.all(promises);

        let error = "";

        results.forEach( (v, i, a) => {
            if (!v) {
                error = error === ""  ? "ID(s) Not available :" : error;
                error = error + ids[i] + ",";
            }
        }, this);

        if (error !== "") {
            const response: RegisterServiceResponse =  new RegisterServiceResponse();
            response.status = RegisterConstants.STATUS_FAILED;
            response.errorCode = RegisterConstants.ERR_ID_NOT_PRESENT;
            response.message = error.slice(0, error.length - 1);

            return response;
        }

        return null;
    }
}
