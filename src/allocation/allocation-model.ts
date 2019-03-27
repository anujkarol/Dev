import { ErrorResponse } from "../commonModels";
// tslint:disable:max-classes-per-file

export class CommonStudentsRequest {
    public teachers: string[];
}

export class CommonStudentResponse extends ErrorResponse {
    public students: string[];

    constructor() {
        super();
        this.students = [];
    }
}
