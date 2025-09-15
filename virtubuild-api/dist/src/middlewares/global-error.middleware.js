"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const configs_1 = require("../configs");
const types_1 = require("../types");
const getErrorData = (error) => {
    const errType = (statusCode) => {
        if (statusCode === types_1.HttpStatusCode.BAD_REQUEST)
            return types_1.HttpErrorTypes.VALIDATION_ERROR;
        if (statusCode === types_1.HttpStatusCode.UNAUTHORIZED)
            return types_1.HttpErrorTypes.UNAUTHORIZED_ERROR;
        if (statusCode === types_1.HttpStatusCode.FORBIDDEN)
            return types_1.HttpErrorTypes.FORBIDDEN_ERROR;
        if (statusCode === types_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            return types_1.HttpErrorTypes.SERVER_ERROR;
    };
    if (Array.isArray(error)) {
        return {
            errCode: types_1.HttpStatusCode.BAD_REQUEST,
            errType: errType(types_1.HttpStatusCode.BAD_REQUEST),
            errMessage: error,
            errTrace: undefined,
        };
    }
    return {
        errCode: error.statusCode || types_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
        errType: errType(error.statusCode || types_1.HttpStatusCode.INTERNAL_SERVER_ERROR),
        errMessage: error.message || "INTERNAL_SERVER_ERROR",
        errTrace: configs_1.SETTINGS.checkCurrentEnvironment(types_1.AppEnvironments.DEV) ? error.stack : null,
    };
};
const ErrorHandlerMiddleware = (error, request, response, next) => {
    const { errCode, errType, errMessage, errTrace } = getErrorData(error);
    response.status(errCode).json({
        errCode,
        errType,
        errMessage,
        ...(errTrace && { errTrace }),
    });
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
