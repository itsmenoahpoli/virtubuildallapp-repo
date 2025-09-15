"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendHttpResponse = void 0;
const SendHttpResponse = (response, data = null, statusCode = 200) => {
    response.status(statusCode).json(data);
};
exports.SendHttpResponse = SendHttpResponse;
