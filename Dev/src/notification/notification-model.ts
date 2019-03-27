import { ErrorResponse } from "../commonModels";
// tslint:disable:max-classes-per-file

export class NotificationRequest {
    public teacher: string;
    public notification: string;

    constructor() {
        this.teacher = "";
        this.notification = "";
    }
}

export class NotificationResponse extends ErrorResponse {
    public recipients: string[];

    constructor() {
        super();
        this.recipients = [];
    }
}
