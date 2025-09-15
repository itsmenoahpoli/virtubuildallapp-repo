"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = exports.HttpErrorTypes = exports.AppEnvironments = void 0;
var AppEnvironments;
(function (AppEnvironments) {
    AppEnvironments["DEV"] = "DEV";
    AppEnvironments["QA"] = "QA";
    AppEnvironments["PROD"] = "PROD";
})(AppEnvironments || (exports.AppEnvironments = AppEnvironments = {}));
var HttpErrorTypes;
(function (HttpErrorTypes) {
    HttpErrorTypes["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    HttpErrorTypes["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    HttpErrorTypes["UNAUTHORIZED_ERROR"] = "UNAUTHORIZED_ERROR";
    HttpErrorTypes["FORBIDDEN_ERROR"] = "FORBIDDEN_ERROR";
    HttpErrorTypes["NOT_FOUND_ERROR"] = "NOT_FOUND_ERROR";
    HttpErrorTypes["SERVER_ERROR"] = "SERVER_ERROR";
})(HttpErrorTypes || (exports.HttpErrorTypes = HttpErrorTypes = {}));
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
