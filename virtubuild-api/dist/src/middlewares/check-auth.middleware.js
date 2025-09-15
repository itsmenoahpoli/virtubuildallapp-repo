"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const configs_1 = require("../configs");
const types_1 = require("../types");
const CheckAuthMiddleware = (request, response, next) => {
    const header = request.header("Authorization");
    const token = header?.split(" ")[1];
    if (!header || !token) {
        (0, utils_1.SendHttpResponse)(response, {
            message: types_1.HttpErrorTypes.UNAUTHORIZED_ERROR,
        }, types_1.HttpStatusCode.UNAUTHORIZED);
        return;
    }
    jsonwebtoken_1.default.verify(token, configs_1.SETTINGS.APP_JWT_SECRET_KEY, (error, user) => {
        if (error) {
            (0, utils_1.SendHttpResponse)(response, { message: "FORBIDDEN" }, types_1.HttpStatusCode.FORBIDDEN);
            return;
        }
        // @ts-ignore
        request.user = user;
        next();
    });
};
exports.CheckAuthMiddleware = CheckAuthMiddleware;
