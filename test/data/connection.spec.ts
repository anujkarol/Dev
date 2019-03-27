import chai = require("chai");
import "mocha";
import {pool} from "../../src/data/connection";
// tslint:disable:no-unused-expression

describe("Connection Test suit", () => {
    it("Connection test", async () => {
        const promise = new Promise((resolve, reject) => {

            pool.query("select 1", (err, result, fields) => {
                if (err) {
                    chai.assert.fail(`error - ${JSON.stringify(err)}`);
                    resolve(null);
                }
                resolve(result);
            });

        });
        const finalResult: any =  await promise;

        chai.expect(finalResult).not.null;
        chai.expect(finalResult[0]).not.null;
        chai.expect(finalResult[0]["1"]).to.be.eq(1);
    });
});
