
import { Request, Response } from "express";
import { Log } from "../Logger";
import { StudentConstant } from "./student-constants";
import { StudentSuspendRequest, StudentSuspendResponse } from "./student-model";
import { StudentService } from "./student-service";

export class StudentController {
    public static inst  =  new StudentController();
    public service: StudentService;

    private constructor() {
        this.service =  new StudentService();
    }

    public async suspendStudent(req: Request, res: Response) {
        const request =  this.mapRequest(req);
        let response: StudentSuspendResponse;

        if (request.studentId == null || request.studentId === "") {
            response = new StudentSuspendResponse();
            response.errorCode =  StudentConstant.ERR_CODE_NO_STUDENT;
            response.message = "Student ID is null or empty";
            response.status = StudentConstant.STATUS_FAILED;

            res.status(500);
            res.send(response);
        }

        response =  await this.service.suspendStudent(request);
        res.status(response != null && response.errorCode != null && response.errorCode !== "" ? 500 : 200);
        res.send(response);
    }

    public mapRequest(req: Request): StudentSuspendRequest {
        const request = new StudentSuspendRequest();
        request.studentId = req != null && req.body != null && req.body.student ? req.body.student : "";

        return request;
    }

}
