"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesRouter = void 0;
const express_1 = require("express");
const user_roles_controller_1 = require("./user-roles.controller");
class UserRolesRouter {
    router;
    userRolesController;
    constructor() {
        this.router = (0, express_1.Router)();
        this.userRolesController = new user_roles_controller_1.UserRolesController();
        this.initializeRoutes();
    }
    get routerRoutes() {
        return this.router;
    }
    initializeRoutes() {
        this.router.get("/", this.userRolesController.fetchListHandler);
        this.router.get("/:id", this.userRolesController.fetchByIdHandler);
        this.router.patch("/:id", this.userRolesController.updateByIdHandler);
        this.router.delete("/:id", this.userRolesController.deleteByIdHandler);
        this.router.post("/", this.userRolesController.createHandler);
    }
}
exports.UserRolesRouter = UserRolesRouter;
