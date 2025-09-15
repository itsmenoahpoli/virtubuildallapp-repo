"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsLoggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const logFilepath = node_path_1.default.join(__dirname, "./../../logs", "requests.log");
if (!node_fs_1.default.existsSync(node_path_1.default.dirname(logFilepath))) {
    node_fs_1.default.mkdirSync(node_path_1.default.dirname(logFilepath), { recursive: true });
}
morgan_1.default.token("custom-date", () => new Date().toISOString());
morgan_1.default.token("body", (request) => {
    return JSON.stringify(request.body);
});
const logStream = node_fs_1.default.createWriteStream(logFilepath, { flags: "a" });
const customFormat = "[:custom-date] :method :url :status :body";
const logger = (0, morgan_1.default)(customFormat, { stream: logStream });
exports.RequestsLoggerMiddleware = logger;
