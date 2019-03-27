import chai = require("chai");
import { Request } from "express";
import "mocha";
import sinon = require("sinon");
import { AllocationController } from "../../src/allocation/allocation-controller";
import {Log} from "../../src/logger";
import { CommonStudentsRequest } from "./../../src/allocation/allocation-model";

describe("Allocation Controller test suite", () => {

    it("Test case map request", () => {
        const controller  =  AllocationController.inst;

        // tslint:disable-next-line:prefer-const
        const req = {
            query: {
                teacher: "abc"
            }
        };

        let result: CommonStudentsRequest = controller.mapRequest(req as Request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        chai.assert.isNotNull(result);
        chai.expect(result.teachers.length).to.be.eq(1);

        const req1 = {
            query: {
                teacher: ["abc", "123"]
            }
        };

        result = controller.mapRequest(req1 as Request);
        Log.info(`Result = ${JSON.stringify(result)}`);
        chai.assert.isNotNull(result);
        chai.expect(result.teachers.length).to.be.eq(2);
    });

});
