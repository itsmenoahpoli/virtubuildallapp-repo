"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUrlParams = ValidateUrlParams;
const utils_1 = require("@/utils");
const types_1 = require("@/types");
const checkMissingParams = (requiredParams, request) => {
    if (Array.isArray(requiredParams)) {
        return requiredParams.filter((param) => !request.params[param]).join(", ");
    }
    return !request.params[requiredParams] ? requiredParams : "";
};
function ValidateUrlParams(requiredParams) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (request, response, next) {
            const missingParams = checkMissingParams(requiredParams, request);
            if (missingParams.length > 0) {
                return (0, utils_1.SendHttpResponse)(response, { error: `Missing parameters: ${missingParams}` }, types_1.HttpStatusCode.BAD_REQUEST);
            }
            return originalMethod.apply(this, arguments);
        };
    };
}
