import { Router } from "express";
import { ActivitiesController } from "./activities.controller";
import { CheckAuthMiddleware } from "@/middlewares/check-auth.middleware";

export class ActivitiesRouter {
	private router: Router;
	private controller: ActivitiesController;

	constructor() {
		this.router = Router();
		this.controller = new ActivitiesController();
		this.initializeRoutes();
	}

	get routerRoutes() {
		return this.router;
	}

	private initializeRoutes() {
		this.router.get("/module/:moduleId", CheckAuthMiddleware, this.controller.listByModuleHandler);
		this.router.get("/:id", CheckAuthMiddleware, this.controller.getByIdHandler);
	}
}


