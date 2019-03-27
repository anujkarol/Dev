import {Request, Response} from "express";
import { Log } from "../Logger";
import {RegisterConstants} from "./register-constants";
import { RegisterServiceRequest, RegisterServiceResponse} from "./register-model";
import {RegisterService} from "./register-service";

export class RegisterController {

    public static inst: RegisterController =  new RegisterController();
    public service: RegisterService;

    private constructor() {
        this.service = new RegisterService();
    }

    public async handle(req: Request, res: Response) {
        let response: RegisterServiceResponse = new RegisterServiceResponse();

        if (req.body == null) {
            response.status = "FAILED";
            response.errorCode = RegisterConstants.ERR_VALIDATION;
            response.message = "Request is null or empty";
            Log.error("request body is empty");
            res.status(500);
            res.send(response);
            return;
        }
        const request: RegisterServiceRequest = this.mapToRequestObject(req);
        response = this.validateRequest(request);

        if (response != null) {
            res.send(response);
            return;
        }

        response = await this.service.register(request);
        res.status(response.message != null && response.message !== "" ? 500 : 204);
        res.send(response);
    }

    public mapToRequestObject(req: Request) {
        const request: RegisterServiceRequest =  new RegisterServiceRequest();

        request.teacher = req.body.teacher;
        request.students = req.body.students;

        return request;
    }

    public validateRequest(req: RegisterServiceRequest): RegisterServiceResponse {
        if (req.teacher == null || req.teacher === "" ) {
            const res: RegisterServiceResponse =  new RegisterServiceResponse();

            res.errorCode = RegisterConstants.ERR_VALIDATION;
            res.message = "Teacher is empty";
            res.status = "FAILED";

            return res;
        }

        if (req.students == null || req.students.length < 0 ) {
            const res: RegisterServiceResponse = new RegisterServiceResponse();

            res.errorCode = RegisterConstants.ERR_VALIDATION;
            res.message = "Student list is empty";
            res.status = "FAILED";

            return res;
        }
        return null;
    }
}
