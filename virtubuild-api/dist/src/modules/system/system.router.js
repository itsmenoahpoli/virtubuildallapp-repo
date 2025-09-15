"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemRouter = void 0;
const express_1 = require("express");
const system_controller_1 = require("./system.controller");
exports.SystemRouter = (0, express_1.Router)().get("/healthcheck", system_controller_1.SystemController.healthcheck);
