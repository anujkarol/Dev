
import { Request, Response } from "express";
import { Log } from "../Logger";
import { NotificationConstants } from "./notification-constants";
import { NotificationRequest, NotificationResponse } from "./notification-model";
import { NotificationService } from "./notification-service";

export class NotificationController {
    public static inst =  new NotificationController();
    public service: NotificationService;

    private constructor() {
        this.service =  new NotificationService();
    }

    public async findRecipients(req: Request, res: Response) {
        let response: NotificationResponse;

        try {
            const request =  this.mapRequest(req);

            if (request.teacher == null || request.teacher === "" ) {
                response = new NotificationResponse();
                response.errorCode = NotificationConstants.ERR_VALIDATION_TEACHER;
                response.message = "Teacher ID  is null or empty";

                res.status(500);
                res.send(response);
                return;
            }

            response =  await this.service.findRecipients(request);

            res.status(response.errorCode !== "" ? 500 : 200);
            res.send(response);

        } catch (err) {
            response =  new  NotificationResponse();
            response.errorCode = NotificationConstants.ERR_CODE_UNKNOWN;
            response.message = "Unknown Technical Issue";

            res.status(500);
            res.send(response);
        }
    }

    public mapRequest(req: Request): NotificationRequest {
        const request: NotificationRequest = new NotificationRequest();

        if (req != null && req.body != null) {
            request.teacher = req.body.teacher;
            request.notification = req.body.notification;
        }

        return request;
    }
}
