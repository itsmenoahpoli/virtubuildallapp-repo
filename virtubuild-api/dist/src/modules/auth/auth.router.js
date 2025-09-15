"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
class AuthRouter {
    router;
    authController;
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.initializeRoutes();
    }
    get routerRoutes() {
        return this.router;
    }
    initializeRoutes() {
        this.router.post("/signin", this.authController.signinHandler);
        this.router.post("/signup", this.authController.signupHandler);
    }
}
exports.AuthRouter = AuthRouter;
