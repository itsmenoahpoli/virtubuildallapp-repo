"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesRouter = exports.AuthRouter = exports.SystemRouter = void 0;
var system_router_1 = require("../modules/system/system.router");
Object.defineProperty(exports, "SystemRouter", { enumerable: true, get: function () { return system_router_1.SystemRouter; } });
var auth_router_1 = require("../modules/auth/auth.router");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return auth_router_1.AuthRouter; } });
var user_roles_router_1 = require("../modules/user-roles/user-roles.router");
Object.defineProperty(exports, "UserRolesRouter", { enumerable: true, get: function () { return user_roles_router_1.UserRolesRouter; } });
