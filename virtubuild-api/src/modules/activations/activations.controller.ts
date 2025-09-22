import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { ActivationsService } from "./activations.service";
import { HttpStatusCode } from "@/types";
import { SendHttpResponse } from "@/utils";

export class ActivationsController extends BaseController {
	public activationsService: ActivationsService;

	constructor() {
		super();
		this.activationsService = new ActivationsService();
		this.bindClassMethods(this);
	}

	/**
	 * @swagger
	 * /activations/module/{moduleId}:
	 *   get:
	 *     summary: List activations by module (instructor)
	 *     tags: [Activations]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async listByModuleHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.activationsService.listByModule(+request.params.moduleId);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	/**
	 * @swagger
	 * /activations/module/{moduleId}/groups/{groupName}:
	 *   post:
	 *     summary: Activate module for group (instructor)
	 *     tags: [Activations]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async activateHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.activationsService.activate(+request.params.moduleId, request.params.groupName);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	/**
	 * @swagger
	 * /activations/module/{moduleId}/groups/{groupName}:
	 *   delete:
	 *     summary: Deactivate module for group (instructor)
	 *     tags: [Activations]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async deactivateHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.activationsService.deactivate(+request.params.moduleId, request.params.groupName);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}
}


