import chai = require("chai");
import "mocha";
import { Teacher, TeacherDataAccess } from "../../src/data/teacherDataAccess";

// tslint:disable:no-unused-expression

describe("Teacher Data test suit", () => {
    const da = new TeacherDataAccess();

    it("Teacher Data - Add Teacher", async () => {
        const teacher: Teacher =  {
            id: "abc@email.com",
            name: "abc"
        } ;

        let result = await da.addTeacher(teacher);
        chai.assert.isTrue(result);
        let teachers = await da.getTeachersByIds(["abc@email.com"]);
        chai.expect(teachers.length).to.be.eq(1);
        result = await da.deleteTeacher(teacher);
        chai.assert.isTrue(result);
        teachers = await da.getTeachersByIds(["abc@email.com"]);
        chai.expect(teachers.length).to.be.eq(0);
    });

    describe("IS Teacher present", () => {
        const teacher: Teacher = {
            id: "abc@email.com",
            name: "abc"
        };

        beforeEach(async () => {
            const result = await da.addTeacher(teacher);
            chai.assert.isTrue(result);
        });

        afterEach(async () => {
            const result = await da.deleteTeacher(teacher);
            chai.assert.isTrue(result);
        });

        it("is Teacher Present", async () => {
            let result = await da.isTeacherPresent("abc@email.com");
            chai.expect(result).to.be.true;
            result = await da.isTeacherPresent("no_id@nowhere.com");
            chai.expect(result).to.be.false;
        });
    });
});
