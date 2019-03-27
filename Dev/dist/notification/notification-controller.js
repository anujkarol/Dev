"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_constants_1 = require("./notification-constants");
const notification_model_1 = require("./notification-model");
const notification_service_1 = require("./notification-service");
class NotificationController {
    constructor() {
        this.service = new notification_service_1.NotificationService();
    }
    findRecipients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                const request = this.mapRequest(req);
                if (request.teacher == null || request.teacher === "") {
                    response = new notification_model_1.NotificationResponse();
                    response.errorCode = notification_constants_1.NotificationConstants.ERR_VALIDATION_TEACHER;
                    response.message = "Teacher ID  is null or empty";
                    res.status(500);
                    res.send(response);
                    return;
                }
                response = yield this.service.findRecipients(request);
                res.status(response.errorCode !== "" ? 500 : 200);
                res.send(response);
            }
            catch (err) {
                response = new notification_model_1.NotificationResponse();
                response.errorCode = notification_constants_1.NotificationConstants.ERR_CODE_UNKNOWN;
                response.message = "Unknown Technical Issue";
                res.status(500);
                res.send(response);
            }
        });
    }
    mapRequest(req) {
        const request = new notification_model_1.NotificationRequest();
        if (req != null && req.body != null) {
            request.teacher = req.body.teacher;
            request.notification = req.body.notification;
        }
        return request;
    }
}
NotificationController.inst = new NotificationController();
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification-controller.js.map