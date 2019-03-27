import chai = require("chai");
import "mocha";
import { Student, StudentDataAccess } from "../../src/data/studentDataAccess";

// tslint:disable:no-unused-expression

describe("Student Data test suit", () => {
    const da = new StudentDataAccess();

    it("Student Data - Add Student", async () => {
        const student: Student =  {
            id: "abc@email.com",
            name: "abc",
            active: 1
        } ;

        let result =  await da.addStudent(student);
        chai.assert.isTrue(result);
        let students = await da.getStudentsByIds(["abc@email.com"]);
        chai.expect(students.length).to.be.eq(1);
        result = await da.deleteStudent(student);
        chai.assert.isTrue(result);
        students = await da.getStudentsByIds(["abc@email.com"]);
        chai.expect(students.length).to.be.eq(0);
    });

    describe("IS student present", () => {
        const student: Student = {
            id: "abc@email.com",
            name: "abc",
            active: 1
        };

        beforeEach(async () => {
            const result = await da.addStudent(student);
            chai.assert.isTrue(result);
        });

        afterEach(async () => {
            const result = await da.deleteStudent(student);
            chai.assert.isTrue(result);
        });

        it("is Student Present", async () => {
            let result = await da.isStudentPresent("abc@email.com");
            chai.expect(result).to.be.true;
            result = await da.isStudentPresent("no_id@nowhere.com");
            chai.expect(result).to.be.false;
        });
    });

    describe("Suspend student test suite", () => {

        const student: Student = {
            id: "abc@email.com",
            name: "abc",
            active: 1
        };

        beforeEach(async () => {
            const result = await da.addStudent(student);
            chai.assert.isTrue(result);
        });

        afterEach(async () => {
            const result = await da.deleteStudent(student);
            chai.assert.isTrue(result);
        });

        it("Test case to suspend a student  - success", async () => {
            let result = await da.suspendStudent("abc@email.com");
            chai.assert.isTrue(result);

            const students = await da.getStudentsByIds(["abc@email.com"]);
            chai.expect(students.length).to.be.eq(1);
            chai.expect(students[0].active).to.be.eq(0);

            result = await da.suspendStudent("no-student@email.com");
            chai.assert.isFalse(result);
        });

    });

});
