import chai = require("chai");
import { Request } from "express";
import "mocha";
import sinon = require("sinon");
import { RegisterController} from "../../src/register/register-controller";

describe("Register Controller Test suite", () => {
    it("map request Object", () => {

        const req =  {
            body: {
                students: [
                        "studentjon@example.com", "studenthon@example.com"
                    ],
                teacher: "teacherken@gmail.com"
            }
        };

        const result = RegisterController.inst.mapToRequestObject(req as Request);
        // tslint:disable-next-line:no-unused-expression
        chai.expect(result).not.null;
        chai.expect(result.teacher).to.be.equals("teacherken@gmail.com");
        chai.expect(result.students.length).to.be.eq(2);
    });
});
