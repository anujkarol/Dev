"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonModels_1 = require("../commonModels");
// tslint:disable:max-classes-per-file
class NotificationRequest {
    constructor() {
        this.teacher = "";
        this.notification = "";
    }
}
exports.NotificationRequest = NotificationRequest;
class NotificationResponse extends commonModels_1.ErrorResponse {
    constructor() {
        super();
        this.recipients = [];
    }
}
exports.NotificationResponse = NotificationResponse;
//# sourceMappingURL=notification-model.js.map