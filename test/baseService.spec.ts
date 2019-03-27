import chai = require("chai");
import "mocha";
import sinon = require("sinon");
import { Log} from "../src/logger";
import { BaseService } from "./../src/baseService";

describe("Base service Test suite", () => {
    it("is Teacher Present", async () => {
        const service: BaseService =  new BaseService();
        let  teacherStub =  sinon.stub(service.teacherDA, "isTeacherPresent").returns(Promise.resolve(true));
        let result =  await service.isTeacherPresent("abc.txt");
        chai.assert.isTrue(result);
        teacherStub.restore();

        teacherStub = sinon.stub(service.teacherDA, "isTeacherPresent").returns(Promise.reject(Error("No Teacher")));
        result = await service.isTeacherPresent("abc.txt");
        chai.assert.isFalse(result);
        teacherStub.restore();

    });

    it("is Student Present", async () => {
        const service: BaseService = new BaseService();
        let teacherStub = sinon.stub(service.studentDA, "isStudentPresent").returns(Promise.resolve(true));
        let result = await service.isStudentPresent("abc.txt");
        chai.assert.isTrue(result);
        teacherStub.restore();

        teacherStub = sinon.stub(service.studentDA, "isStudentPresent").returns(Promise.reject(Error("No Teacher")));
        result = await service.isStudentPresent("abc.txt");
        chai.assert.isFalse(result);
        teacherStub.restore();

    });
});
