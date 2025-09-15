"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePayload = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const types_1 = require("../types");
const ValidatePayload = (dto) => {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (request, response, next) {
            const transformedClass = (0, class_transformer_1.plainToInstance)(dto, request.body);
            const errors = await (0, class_validator_1.validate)(transformedClass);
            if (errors.length) {
                const errorData = errors.map((err) => {
                    const { property, constraints } = err;
                    return {
                        field: property,
                        errors: constraints,
                    };
                });
                return (0, utils_1.SendHttpResponse)(response, errorData, types_1.HttpStatusCode.BAD_REQUEST);
            }
            return originalMethod.apply(this, arguments);
        };
    };
};
exports.ValidatePayload = ValidatePayload;
