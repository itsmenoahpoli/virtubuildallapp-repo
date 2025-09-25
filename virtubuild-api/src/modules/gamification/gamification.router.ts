import { Router } from "express";
import { GamificationController } from "./gamification.controller";
import { CheckAuthMiddleware, CheckRoleMiddleware } from "@/middlewares/check-auth.middleware";

export class GamificationRouter {
	private router: Router;
	private controller: GamificationController;

	constructor() {
		this.router = Router();
		this.controller = new GamificationController();
		this.initializeRoutes();
	}

	get routerRoutes() {
		return this.router;
	}

	private initializeRoutes() {
		this.router.get("/me", CheckAuthMiddleware, (req, res) => this.controller.getMyGamification(req, res));
		this.router.get("/leaderboard", CheckAuthMiddleware, (req, res) => this.controller.getLeaderboard(req, res));
		this.router.get("/top-performers", CheckAuthMiddleware, (req, res) => this.controller.getTopPerformers(req, res));
		this.router.get("/rank/me", CheckAuthMiddleware, (req, res) => this.controller.getMyRank(req, res));
		this.router.post("/achievements/check", CheckAuthMiddleware, (req, res) => this.controller.checkAchievements(req, res));
		this.router.post("/badges/award", CheckAuthMiddleware, CheckRoleMiddleware(["instructor", "admin"]), (req, res) => this.controller.awardBadge(req, res));
	}
}
