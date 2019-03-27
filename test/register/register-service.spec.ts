import chai = require("chai");
import "mocha";
import sinon = require("sinon");
import { Log } from "../../src/logger";
import { RegisterServiceRequest } from "../../src/register/register-model";
import { RegisterService } from "../../src/register/register-service";
import { RegisterConstants } from "./../../src/register/register-constants";
import { RegisterServiceResponse } from "./../../src/register/register-model";

describe("Test suite for Register Service", () => {

    it("Validation for IDs in DB", async () => {
        const service: RegisterService =  new RegisterService();
        const teacherStub =  sinon.stub(service, "isTeacherPresent")
                                .returns(Promise.resolve(true));
        const studentStub = sinon.stub(service, "isStudentPresent")
                                .returns(Promise.resolve(true));

        // tslint:disable-next-line:no-shadowed-variable
        const request =  new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student1@abc.com", "student2@bac.com"];

        const result  =  await service.checkIfIdsPresent(request);
        Log.info(`Result ${JSON.stringify(result)}`);
        chai.assert.isNull(result);

        teacherStub.restore();
        studentStub.restore();
    });

    it("Validation for IDs in DB. Teacher not present", async () => {
        const service: RegisterService = new RegisterService();
        const teacherStub = sinon.stub(service, "isTeacherPresent")
            .returns(Promise.resolve(false));
        const studentStub = sinon.stub(service, "isStudentPresent")
            .returns(Promise.resolve(true));

        // tslint:disable-next-line:no-shadowed-variable
        const request = new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student1@abc.com", "student2@bac.com"];

        const result = await service.checkIfIdsPresent(request);
        Log.info(`Result ${JSON.stringify(result)}`);
        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_FAILED);
        chai.expect(result.errorCode).to.be.equals(RegisterConstants.ERR_ID_NOT_PRESENT);
        chai.expect(result.message).to.be.contains("teacher@abc.com");

        teacherStub.restore();
        studentStub.restore();
    });

    it("Validation for IDs in DB. Student not present", async () => {
        const service: RegisterService = new RegisterService();
        const teacherStub = sinon.stub(service, "isTeacherPresent")
            .returns(Promise.resolve(true));
        const studentStub = sinon.stub(service, "isStudentPresent")
            .returns(Promise.resolve(false));

        // tslint:disable-next-line:no-shadowed-variable
        const request = new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student1@abc.com", "student2@bac.com"];

        const result = await service.checkIfIdsPresent(request);
        Log.info(`Result ${JSON.stringify(result)}`);
        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_FAILED);
        chai.expect(result.errorCode).to.be.equals(RegisterConstants.ERR_ID_NOT_PRESENT);
        chai.expect(result.message).to.be.contains("student1@abc.com");

        teacherStub.restore();
        studentStub.restore();
    });

    it("Test case for prepare allocation response Success", () => {
        const service  = new RegisterService();
        const promises: RegisterServiceResponse[] =  [];

        let response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_SUCCESS;
        promises.push(response);

        response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_SUCCESS;
        promises.push(response);

        const result  = service.prepareAllocationResponse(promises);

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_SUCCESS);
    });

    it("Test case for prepare allocation response Partial", () => {
        const service = new RegisterService();
        const promises: RegisterServiceResponse[] = [];

        let response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_SUCCESS;
        promises.push(response);

        response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_FAILED;
        response.message = "error1";
        promises.push(response);

        response = new RegisterServiceResponse();
        response.status = RegisterConstants.STATUS_FAILED;
        response.message = "error2";
        promises.push(response);

        const result = service.prepareAllocationResponse(promises);

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_PARTIAL);
        chai.expect(result.errorCode).to.be.equals(RegisterConstants.ERR_ALLOCATION_FAILED);
        chai.expect(result.message).to.be.equals("\nerror1\nerror2");
    });

    it("Test case to allocate teacher and student already present- success", async () => {
        const service =  new RegisterService();
        const allocationPresentStub =  sinon.stub(service.allocationDA, "isAllocationPresent")
                                    .returns(Promise.resolve(true));
        const allocationStub = sinon.stub(service.allocationDA, "addAllocation")
                                    .returns(Promise.resolve(true));
        // tslint:disable-next-line:no-shadowed-variable
        const request =  new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student@abc.com", "student2@dbs.com"];

        const result = await service.allocate(request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        allocationStub.restore();
        allocationPresentStub.restore();

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_SUCCESS);
    });

    it("Test case to allocate teacher and student NEW- success", async () => {
        const service = new RegisterService();
        const allocationPresentStub = sinon.stub(service.allocationDA, "isAllocationPresent")
            .returns(Promise.resolve(false));
        const allocationStub = sinon.stub(service.allocationDA, "addAllocation")
            .returns(Promise.resolve(true));
        // tslint:disable-next-line:no-shadowed-variable
        const request = new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student@abc.com", "student2@dbs.com"];

        const result = await service.allocate(request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        allocationStub.restore();
        allocationPresentStub.restore();

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_SUCCESS);
    });

    it("Test case to allocate teacher and student NEW- Failed", async () => {
        const service = new RegisterService();
        const allocationPresentStub = sinon.stub(service.allocationDA, "isAllocationPresent")
            .returns(Promise.resolve(false));
        const allocationStub = sinon.stub(service.allocationDA, "addAllocation")
            .returns(Promise.resolve(false));
        // tslint:disable-next-line:no-shadowed-variable
        const request = new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student@abc.com"];

        const result = await service.allocate(request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        allocationStub.restore();
        allocationPresentStub.restore();

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_PARTIAL);
    });

    it("Test case to allocate teacher and student NEW- Error", async () => {
        const service = new RegisterService();
        const allocationPresentStub = sinon.stub(service.allocationDA, "isAllocationPresent")
            .returns(Promise.resolve(false));
        const allocationStub = sinon.stub(service.allocationDA, "addAllocation")
                            .returns(new Promise((resolve, reject) => {
                                throw Error("Error in processing");
                            }));
        allocationStub.withArgs(sinon.match.has("studentId", "student@abc.com")).returns(Promise.resolve(true));
        // tslint:disable-next-line:no-shadowed-variable
        const request = new RegisterServiceRequest();
        request.teacher = "teacher@abc.com";
        request.students = ["student@abc.com", "student2@dbs.com"];

        const result = await service.allocate(request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        allocationStub.restore();
        allocationPresentStub.restore();

        chai.assert.isNotNull(result);
        chai.expect(result.status).to.be.equals(RegisterConstants.STATUS_PARTIAL);
    });
});
