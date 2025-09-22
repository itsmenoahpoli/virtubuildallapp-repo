import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AnalyticsService } from "./analytics.service";
import { HttpStatusCode } from "@/types";
import { SendHttpResponse } from "@/utils";

export class AnalyticsController extends BaseController {
	public analyticsService: AnalyticsService;

	constructor() {
		super();
		this.analyticsService = new AnalyticsService();
		this.bindClassMethods(this);
	}

	/**
	 * @swagger
	 * /analytics/me:
	 *   get:
	 *     summary: Get my performance analytics
	 *     tags: [Analytics]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async getMineHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const userId = (request as any).user?.user?.id as number;
		const result = await this.analyticsService.getForUser(userId);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}
}


