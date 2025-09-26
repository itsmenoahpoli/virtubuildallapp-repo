"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleMiddleware = exports.CheckAuthMiddleware = void 0;
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
        request.user = user;
        next();
    });
};
exports.CheckAuthMiddleware = CheckAuthMiddleware;
const CheckRoleMiddleware = (roles) => {
    return (request, response, next) => {
        const currentUser = request.user?.user;
        if (!currentUser) {
            return (0, utils_1.SendHttpResponse)(response, { message: types_1.HttpErrorTypes.UNAUTHORIZED_ERROR }, types_1.HttpStatusCode.UNAUTHORIZED);
        }
        if (!currentUser.userRoleId) {
            return (0, utils_1.SendHttpResponse)(response, { message: types_1.HttpErrorTypes.FORBIDDEN_ERROR }, types_1.HttpStatusCode.FORBIDDEN);
        }
        const userRoleName = currentUser.roleName || currentUser.role || currentUser.userRoleName;
        if (userRoleName && roles.map(r => r.toLowerCase()).includes(String(userRoleName).toLowerCase())) {
            return next();
        }
        if (roles.includes(String(currentUser.userRoleId))) {
            return next();
        }
        return (0, utils_1.SendHttpResponse)(response, { message: types_1.HttpErrorTypes.FORBIDDEN_ERROR }, types_1.HttpStatusCode.FORBIDDEN);
    };
};
exports.CheckRoleMiddleware = CheckRoleMiddleware;
