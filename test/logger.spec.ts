import chai = require("chai");
import "mocha";
import sinon  = require("sinon");
import { Log } from "../src/logger";

describe("Test suite for logger", () => {

    it("logger info test case", () => {
        const spy = sinon.spy(console, "info");

        Log.info("test one");
        Log.info("test", "two", "three");

        // tslint:disable-next-line:no-unused-expression
        chai.expect(spy.called).to.be.true;
        chai.expect(spy.callCount).to.eq(2);
        spy.restore();
    });

    it("logger error test", () => {
        const spy = sinon.spy(console, "error");

        Log.error("test one");
        Log.error("test", "two", "three");

        // tslint:disable-next-line:no-unused-expression
        chai.expect(spy.called).to.be.true;
        chai.expect(spy.callCount).to.eq(2);
        spy.restore();
    });

});
