import { Request, Response } from "express";
import { AllocationController } from "./allocation/allocation-controller";
import app from "./app";
import { ErrorResponse } from "./commonModels";
import { NotificationController } from "./notification/notification-controller";
import {RegisterController} from "./register/register-controller";
import { StudentController } from "./student/student-controller";

export default  () => {

    app.get("/", (req: Request, res: Response) => {
        res.status(200);
        res.type("text");
        res.send("alive");
    });

    app.post("/", (req: Request, res: Response) => {
        res.status(200);
        res.type("text");
        res.send("alive");
    });

    app.post("/api/register", (req: Request, res: Response) => {
        RegisterController.inst.handle(req, res);
    });

    app.get("/api/commonstudents", (req: Request, res: Response) => {
        AllocationController.inst.findCommonStudent(req, res);
    });

    app.post("/api/suspend", (req: Request, res: Response) => {
        StudentController.inst.suspendStudent(req, res);
    });

    app.post("/api/retrievefornotifications", (req: Request, res: Response) => {
        NotificationController.inst.findRecipients(req, res);
    });

    app.use((req: Request, res: Response) => {
        const response =  new ErrorResponse();
        response.errorCode = "0404";
        response.message = "No routing found";
        res.status(404);
        res.send(response);
    });
    console.log("All routes configured successfully");
};
