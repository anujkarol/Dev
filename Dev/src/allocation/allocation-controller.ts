
import { Request, Response } from "express";
import { Log } from "../Logger";
import { AllocationConstants } from "./allocation-constants";
import { CommonStudentResponse, CommonStudentsRequest } from "./allocation-model";
import { AllocationService } from "./allocation-service";

export class AllocationController {

    public static inst =  new AllocationController();
    public service: AllocationService;

    private constructor() {
        this.service =  new AllocationService();
    }

    public async findCommonStudent(req: Request, res: Response) {
        const request: CommonStudentsRequest =  this.mapRequest(req);
        let response =  this.validateRequest(request);

        if (response == null) {
            response =  await this.service.findCommonStudent(request);
        }

        res.status(response.errorCode !== "" ? 500 : 200);
        res.send(response);
    }

    public mapRequest(req: Request): CommonStudentsRequest {
        const request =  new CommonStudentsRequest();

        if (req.query.teacher instanceof Array) {
            request.teachers = req.query.teacher;
        }

        if (typeof req.query.teacher === "string") {
            request.teachers = [req.query.teacher];
        }

        return request;
    }

    public validateRequest(request: CommonStudentsRequest): CommonStudentResponse {

        if (request.teachers == null || request.teachers.length <= 0) {
            const response = new CommonStudentResponse();
            response.errorCode = AllocationConstants.ERR_CODE_NO_TEACHERS;
            response.message = "Teacher list is empty";

            return response;
        }

        return null;
    }
}
