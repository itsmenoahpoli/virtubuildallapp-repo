"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleMiddleware = exports.CheckAuthMiddleware = exports.GlobalErrorHandlerMiddleware = exports.initializeMiddlewares = void 0;
const requests_logger_middleware_1 = require("./requests-logger.middleware");
const global_error_middleware_1 = require("./global-error.middleware");
Object.defineProperty(exports, "GlobalErrorHandlerMiddleware", { enumerable: true, get: function () { return global_error_middleware_1.ErrorHandlerMiddleware; } });
const console_logger_middleware_1 = require("./console-logger.middleware");
const check_auth_middleware_1 = require("./check-auth.middleware");
Object.defineProperty(exports, "CheckAuthMiddleware", { enumerable: true, get: function () { return check_auth_middleware_1.CheckAuthMiddleware; } });
Object.defineProperty(exports, "CheckRoleMiddleware", { enumerable: true, get: function () { return check_auth_middleware_1.CheckRoleMiddleware; } });
const initializeMiddlewares = (app) => {
    // app.use(CheckApiKeyMiddleware);
    app.use(requests_logger_middleware_1.RequestsLoggerMiddleware);
    app.use(console_logger_middleware_1.MorganLoggerMiddleware);
};
exports.initializeMiddlewares = initializeMiddlewares;
