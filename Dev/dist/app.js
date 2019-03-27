"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3001);
// export out app
exports.default = app;
//# sourceMappingURL=app.js.map