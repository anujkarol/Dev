"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static info(...args) {
        console.info("INFO", ...args);
    }
    static error(...args) {
        console.error("ERROR", ...args);
    }
}
exports.Log = Log;
//# sourceMappingURL=logger.js.map