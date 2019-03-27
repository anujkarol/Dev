import { BaseService } from "../baseService";
import { Log } from "../logger";
import { AllocationDataAccess } from "./../data/allocationDataAccess";
import { AllocationConstants} from "./allocation-constants";
import { CommonStudentResponse, CommonStudentsRequest} from "./allocation-model";

export class AllocationService extends BaseService {

    public allocationDA: AllocationDataAccess;
    constructor() {
        super();
        this.allocationDA =  new AllocationDataAccess();
    }

    public async findCommonStudent(request: CommonStudentsRequest): Promise<CommonStudentResponse> {
        try {
            const students = await this.allocationDA.commonStudents(request.teachers);
            const response = new CommonStudentResponse();
            response.students =  students;

            return response;

        } catch ( err ) {
            const response = new CommonStudentResponse();
            response.errorCode = AllocationConstants.ERR_CODE_UNKNOWN;
            response.message =  err !=  null ? err.message : "Technical Error in Find common students";

            return err;
        }
    }

}
