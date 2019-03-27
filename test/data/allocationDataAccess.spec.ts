import chai = require("chai");
import "mocha";
import { Allocation, AllocationDataAccess } from "../../src/data/allocationDataAccess";

// tslint:disable:no-unused-expression

describe("Teacher Data test suit", () => {
    const da = new AllocationDataAccess();

    it("Allocation Data - Add Allocation", async () => {
        const allocation: Allocation =  {
            teacherId : "teacher-abc@email.com",
            studentId : "student-abcd@email.com"
        } ;

        let result = await da.addAllocation(allocation);
        chai.assert.isTrue(result);
        let teachers = await da.getAllocationForTeacherId(allocation.teacherId);
        chai.expect(teachers.length).to.be.eq(1);
        result = await da.deleteAllocation(allocation);
        chai.assert.isTrue(result);
        teachers = await da.getAllocationForTeacherId(allocation.teacherId);
        chai.expect(teachers.length).to.be.eq(0);
    });

    describe("IS Allocation present", () => {
        const allocation: Allocation = {
            teacherId: "teacher-abc@email.com",
            studentId: "student-abcd@email.com"
        };

        beforeEach(async () => {
            const result = await da.addAllocation(allocation);
            chai.assert.isTrue(result);
        });

        afterEach(async () => {
            const result = await da.deleteAllocation(allocation);
            chai.assert.isTrue(result);
        });

        it("is Teacher Present", async () => {
            let result = await da.isAllocationPresent(allocation.teacherId, allocation.studentId);
            chai.expect(result).to.be.true;
            result = await da.isAllocationPresent("no_id@nowhere.com", "no-student@gmail.com");
            chai.expect(result).to.be.false;
        });
    });

    describe("Test suite for common Students", () => {
        const allocation: Allocation[] = [{
                teacherId: "teacher-abc@email.com",
                studentId: "student-abcd@email.com"
            },
            {
                teacherId: "teacher-xyz@email.com",
                studentId: "student-abcd@email.com"
            },
            {
                teacherId: "teacher-xyz@email.com",
                studentId: "student-123d@email.com"
            }
        ];
        beforeEach(async () => {
            let result = await da.addAllocation(allocation[0]);
            chai.assert.isTrue(result);
            result = await da.addAllocation(allocation[1]);
            chai.assert.isTrue(result);
            result = await da.addAllocation(allocation[2]);
            chai.assert.isTrue(result);
        });

        afterEach(async () => {
            let result = await da.deleteAllocation(allocation[0]);
            chai.assert.isTrue(result);
            result = await da.deleteAllocation(allocation[1]);
            chai.assert.isTrue(result);
            result = await da.deleteAllocation(allocation[2]);
            chai.assert.isTrue(result);
        });

        it("Common students Test Case", async () => {
            let result = await da.commonStudents(["teacher-abc@email.com", "teacher-xyz@email.com"]);
            chai.expect(result.length).to.be.eq(1);
            chai.expect(result[0]).to.be.eq("student-abcd@email.com");
            result = await da.commonStudents(["teacher-abc@email.com", "no-teacher@email.com"]);
            chai.expect(result.length).to.be.eq(0);
        });
    });
});
