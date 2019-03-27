import { BaseService } from "../baseService";
import { AllocationDataAccess } from "../data/allocationDataAccess";
import { Student } from "../data/studentDataAccess";
import { Log } from "../logger";
import { NotificationConstants } from "./notification-constants";
import { NotificationRequest, NotificationResponse} from "./notification-model";

export class NotificationService extends BaseService {

    public allocationDA: AllocationDataAccess;

    constructor() {
        super();
        this.allocationDA = new AllocationDataAccess();
    }

    public async findRecipients(request: NotificationRequest): Promise<NotificationResponse>  {
        const response = new NotificationResponse();

        const allocatedRecipients =  await this.findActiveAllocatedStudents(request);
        response.recipients = allocatedRecipients;

        return response;
    }

    public extractRecipientsFromNotifications(notification: string): string[] {
        if (notification == null) {
            return null;
        }

        const reg = /@[^\s]+@[^\s]+\.[a-zA-Z]{3}/g;
        const matches: string[] =  notification.match(reg);

        if (matches == null) {
            return [];
        }

        const ids: string[] = [];
        matches.forEach(v => ids.push(v.slice(1)));

        return ids;
    }

    public async findActiveAllocatedStudents(request: NotificationRequest): Promise<string[]> {

        let allocations: string[] = await this.allocationDA.getAllocationForTeacherId(request.teacher);
        allocations = allocations == null ? [] : allocations;

        const extractedRecipients = this.extractRecipientsFromNotifications(request.notification);

        allocations =  allocations.concat(extractedRecipients);

        const students: Student[] = await this.studentDA.getStudentsByIds(allocations);

        if (students == null) {
            return [];
        }

        const activeStudents: string[] = [];
        students.filter(i => i.active === 1).forEach(v => activeStudents.push(v.id));

        return activeStudents;
    }
}
