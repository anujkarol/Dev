
import {ErrorResponse} from "../commonModels";
// tslint:disable:max-classes-per-file

export class RegisterServiceRequest {
    public teacher: string;
    public students: string[];

    constructor() {
        this.teacher = "";
        this.students = [];
    }
}

export class RegisterServiceResponse extends ErrorResponse {
    public status: string;
}
