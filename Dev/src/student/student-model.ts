
import { ErrorResponse } from "../commonModels";
// tslint:disable:max-classes-per-file

export class StudentSuspendRequest {
    public studentId: string;

    constructor() {
        this.studentId = "";
    }
}

export class StudentSuspendResponse  extends ErrorResponse {
    public status: string;
}
