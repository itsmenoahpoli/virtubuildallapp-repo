import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { ActivitiesService } from "./activities.service";
import { HttpStatusCode } from "@/types";
import { SendHttpResponse } from "@/utils";

export class ActivitiesController extends BaseController {
	public activitiesService: ActivitiesService;

	constructor() {
		super();
		this.activitiesService = new ActivitiesService();
		this.bindClassMethods(this);
	}

	/**
	 * @swagger
	 * /activities/module/{moduleId}:
	 *   get:
	 *     summary: List activities by module
	 *     tags: [Activities]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async listByModuleHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.activitiesService.listByModule(+request.params.moduleId);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	/**
	 * @swagger
	 * /activities/{id}:
	 *   get:
	 *     summary: Get activity by id
	 *     tags: [Activities]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async getByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.activitiesService.getById(+request.params.id);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}
}


