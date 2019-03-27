"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allocation_controller_1 = require("./allocation/allocation-controller");
const app_1 = __importDefault(require("./app"));
const commonModels_1 = require("./commonModels");
const notification_controller_1 = require("./notification/notification-controller");
const register_controller_1 = require("./register/register-controller");
const student_controller_1 = require("./student/student-controller");
exports.default = () => {
    app_1.default.get("/", (req, res) => {
        res.status(200);
        res.type("text");
        res.send("alive");
    });
    app_1.default.post("/", (req, res) => {
        res.status(200);
        res.type("text");
        res.send("alive");
    });
    app_1.default.post("/api/register", (req, res) => {
        register_controller_1.RegisterController.inst.handle(req, res);
    });
    app_1.default.get("/api/commonstudents", (req, res) => {
        allocation_controller_1.AllocationController.inst.findCommonStudent(req, res);
    });
    app_1.default.post("/api/suspend", (req, res) => {
        student_controller_1.StudentController.inst.suspendStudent(req, res);
    });
    app_1.default.post("/api/retrievefornotifications", (req, res) => {
        notification_controller_1.NotificationController.inst.findRecipients(req, res);
    });
    app_1.default.use((req, res) => {
        const response = new commonModels_1.ErrorResponse();
        response.errorCode = "0404";
        response.message = "No routing found";
        res.status(404);
        res.send(response);
    });
    console.log("All routes configured successfully");
};
//# sourceMappingURL=route.js.map