import chai = require("chai");
import chaiHttp =  require("chai-http");
import "mocha";
import app from "../src/app";
import route from "../src/route";

route();
chai.use(chaiHttp);

describe("API Integration test Cases", () => {

    describe("Test suite for API /", () => {

        it("Get / should be alive on call", async () => {
            return chai
                .request(app)
                .get("/")
                .then(res => {
                    chai.expect(res.text).to.eql("alive");
                });
        });

        it("Post / should be alive on call", async () => {
            return chai
                .request(app)
                .post("/")
                .then(res => {
                    chai.expect(res.text).to.eql("alive");
                });
        });

    });
});
