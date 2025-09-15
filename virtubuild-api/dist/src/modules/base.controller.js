"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const types_1 = require("../types");
class BaseController {
    sendHttpResponse(response, data = null, statusCode = types_1.HttpStatusCode.OK) {
        return response.status(statusCode).json(data);
    }
    bindClassMethods(instance) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
            .filter((key) => typeof instance[key] === "function" && key !== "constructor")
            .forEach((key) => {
            instance[key] = instance[key].bind(instance);
        });
    }
    generateListFilters(query) {
        const filters = {
            withDeleted: Boolean(query.withDeleted === "true"),
        };
        return filters;
    }
}
exports.BaseController = BaseController;
