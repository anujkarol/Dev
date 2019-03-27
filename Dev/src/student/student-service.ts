import { BaseService } from "../baseService";
import { Log } from "../logger";
import { StudentConstant } from "./student-constants";
import { StudentSuspendRequest, StudentSuspendResponse } from "./student-model";

export class StudentService extends BaseService {

    public async suspendStudent(request: StudentSuspendRequest): Promise<StudentSuspendResponse> {
        try {
            const result = await this.studentDA.suspendStudent(request.studentId);

            const response = new StudentSuspendResponse();
            response.status = StudentConstant.STATUS_SUCCESS;

            if (!result) {
                response.errorCode = StudentConstant.ERR_CODE_SUSPEND_FAILED;
                response.message = "Error while Suspending";
                response.status = StudentConstant.STATUS_FAILED;
            }

            return response;
        } catch (err) {
            const response = new StudentSuspendResponse();

            response.errorCode = StudentConstant.ERR_CODE_SUSPEND_FAILED;
            response.message = "Error while Suspending";
            response.status = StudentConstant.STATUS_FAILED;

            return response;
        }

    }
}
