"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckApiKeyMiddleware = void 0;
const configs_1 = require("../configs");
const utils_1 = require("../utils");
const types_1 = require("../types");
const CheckApiKeyMiddleware = (request, response, next) => {
    const header = request.header("X-API-KEY");
    if (!header || header !== configs_1.SETTINGS.APP_SECRET_KEY) {
        (0, utils_1.SendHttpResponse)(response, {
            message: types_1.HttpErrorTypes.FORBIDDEN_ERROR,
        }, types_1.HttpStatusCode.FORBIDDEN);
        return;
    }
    next();
};
exports.CheckApiKeyMiddleware = CheckApiKeyMiddleware;
