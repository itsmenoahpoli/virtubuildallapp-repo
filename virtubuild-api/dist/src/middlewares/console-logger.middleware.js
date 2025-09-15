"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorganLoggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const morganLogger = (0, morgan_1.default)((tokens, req, res) => {
    const status = tokens.status(req, res);
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const responseTime = tokens["response-time"](req, res);
    const logLine = [
        method,
        url,
        status,
        responseTime ? `${responseTime}ms` : "",
    ].join(" ");
    if (status) {
        if (status.startsWith("4")) {
            return chalk_1.default.yellow(logLine);
        }
        else if (status.startsWith("5")) {
            return chalk_1.default.red(logLine);
        }
        return chalk_1.default.green(logLine);
    }
    return logLine;
});
exports.MorganLoggerMiddleware = morganLogger;
