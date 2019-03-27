import chai = require("chai");
import "mocha";
import sinon = require("sinon");
import { Log } from "../../src/logger";
import { NotificationService } from "../../src/notification/notification-service";

describe("Notification Service Test Suite", () => {
    it("extractRecipientsFromNotifications Test case", () => {
        const service =  new NotificationService();
        let str = "Hello students! @studentagnes@example.com @studentmiche@example.com";
        let result: string[] =  service.extractRecipientsFromNotifications(str);

        chai.expect(result.length).to.be.eq(2);
        chai.expect(result[0]).to.be.equals("studentagnes@example.com");
        chai.expect(result[1]).to.be.equals("studentmiche@example.com");

        str = "Hello students";
        result = service.extractRecipientsFromNotifications(str);

        chai.expect(result.length).to.be.eq(0);
    });
});
