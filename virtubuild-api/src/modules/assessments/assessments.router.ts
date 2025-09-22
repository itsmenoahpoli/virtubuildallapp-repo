import { Router } from "express";
import { AssessmentsController } from "./assessments.controller";
import { CheckAuthMiddleware, CheckRoleMiddleware } from "@/middlewares/check-auth.middleware";

export class AssessmentsRouter {
	private router: Router;
	private controller: AssessmentsController;

	constructor() {
		this.router = Router();
		this.controller = new AssessmentsController();
		this.initializeRoutes();
	}

	get routerRoutes() {
		return this.router;
	}

	private initializeRoutes() {
		this.router.get("/module/:moduleId", CheckAuthMiddleware, this.controller.getByModuleHandler);
		this.router.put("/module/:moduleId", CheckAuthMiddleware, CheckRoleMiddleware(["instructor"]), this.controller.upsertHandler);
	}
}


