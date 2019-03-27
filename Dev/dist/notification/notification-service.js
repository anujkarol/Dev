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
const baseService_1 = require("../baseService");
const allocationDataAccess_1 = require("../data/allocationDataAccess");
const notification_model_1 = require("./notification-model");
class NotificationService extends baseService_1.BaseService {
    constructor() {
        super();
        this.allocationDA = new allocationDataAccess_1.AllocationDataAccess();
    }
    findRecipients(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new notification_model_1.NotificationResponse();
            const allocatedRecipients = yield this.findActiveAllocatedStudents(request);
            // const extractedRecipients =  this.extractRecipientsFromNotifications(request.notification);
            // const recipientSet: Set<string> =  new Set();
            // allocatedRecipients.forEach(v => recipientSet.add(v));
            // extractedRecipients.forEach(v => recipientSet.add(v));
            // const recipients: string[] = [];
            // recipientSet.forEach(v => recipients.push(v));
            response.recipients = allocatedRecipients;
            return response;
        });
    }
    extractRecipientsFromNotifications(notification) {
        if (notification == null) {
            return null;
        }
        const reg = /@[^\s]+@[^\s]+\.[a-zA-Z]{3}/g;
        const matches = notification.match(reg);
        if (matches == null) {
            return [];
        }
        const ids = [];
        matches.forEach(v => ids.push(v.slice(1)));
        return ids;
    }
    findActiveAllocatedStudents(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let allocations = yield this.allocationDA.getAllocationForTeacherId(request.teacher);
            allocations = allocations == null ? [] : allocations;
            const extractedRecipients = this.extractRecipientsFromNotifications(request.notification);
            allocations = allocations.concat(extractedRecipients);
            const students = yield this.studentDA.getStudentsByIds(allocations);
            if (students == null) {
                return [];
            }
            const activeStudents = [];
            students.filter(i => i.active === 1).forEach(v => activeStudents.push(v.id));
            return activeStudents;
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification-service.js.map